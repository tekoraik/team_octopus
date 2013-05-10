

;(function (doc, win ){
     /**
      * @author Alexander Flores
      * @author {Comments} Enric Sangrà
      */   
    Core.register("Floor", function ( oBox ){
    	var nFloor,					//this is the id of the floor
    		sFloor,
    		aDoors = [], 
    		aControlPanel = [],			//this property is possible unnecessary
    		oControlPanelQueue = {},
    		oDoorQueue = {},
    		oWaitingQueue = new Queue(),	//this is the queue for entry in the sistem
    		aPeopleArrivedAtFloor = [],
    		oControlPanelQueueTotalPeople = {},
    		oDoorQueueTotalPeople = {},
    		nSetIntervaId = 0;
    
    	/**
    	 * Removes the first element from the Waiting Queue (Person) and adds it to the Control
    	 * Panel Queue where the person wants to go.
    	 */
    	function movePersonFromWaitingToControlPanelQueue() {	
    		var oPerson = oWaitingQueue.shift(),
    			sPanel = oPerson.getPanel();
    			
    		oControlPanelQueue[sPanel].push(oPerson);
    		oControlPanelQueueTotalPeople[sPanel]++;
    		if(oControlPanelQueue[sPanel].length() === 1){
    			requestElevator(sPanel);
    		}		
    
    	}
    	/**
         * Removes the first element from the Control Panel Queue (Person) and adds it to the Door
         * Queue which the data indicates.
    	 * @param {Object} oData is the object recieved from the published message. It contains:
    	 *     sControlPanel {String} the name of the control panel where the element will be
    	 *     substracted.
    	 *     sElevatorName {String} the name of the elevator where the element will be added.
    	 */
        function movePersonFromControlPanelToDoorQueue( oData ) {
    		var sDoor = oData.sElevatorName,
    			sPanel = oData.sControlPanel,
    			oPerson = oControlPanelQueue[sPanel].shift();	
    					
    		oDoorQueue[sDoor].push(oPerson);
    		oDoorQueueTotalPeople[sDoor]++;
    		if( oControlPanelQueue[sPanel].hasMoreElements() ){
    			requestElevator(sPanel);
    		}
    
    	}
    	/**
    	 * Requests an elevator destination the floor which the first element (Person) in the queue
    	 * of the control panel indicated wants to go.
    	 * @param {String} sPanel is the name of the panel the element will be accessed.
    	 */
    	function requestElevator( sPanel ){
    	    var oPerson,
                oDistinationFloor;
    	       
    		if( oControlPanelQueue[sPanel].hasMoreElements() ){
    			oPerson = oControlPanelQueue[sPanel].getFirstElement();
    			oDestinationFloor = { 
                    "nFloorDest" : oPerson.getDestination(),
                    "sControlPanel" : sPanel
                };
    			oBox.publish( "floor-" + nFloor, "requestElevator", oDestinationFloor );
    		}
    
    	}
    	/**
    	 * This function put all the person into the elevator
    	 * @param {Object} oData is the object recieved from the published message. It contains:
    	 *     sElevatorName {String} the elevator corresponding to the door that should be opened.
    	 */
    	function openDoor( oData ){
    		var sDoor = oData.sElevatorName;
    		box.publish( "elevator-" + sDoor, "doorIsOpen", {} );
    	}
    	
    	/**
    	 * 
    	 * @param {Object} oData is the object recieved from the published message. It contains:
    	 *     sElevatorName {String} is the name of the elevator where people will be board or lift.
    	 *     aLiftPeople {Array} is an array containing all the people that is going down in this
    	 *     floor that where inside the elevator.
    	 */
    	function manageElevatorEntry( oData ){
    
    		var sDoor = oData.sElevatorName,
    			nLengthQueue = oDoorQueue[sDoor].length(),
    			aPeopleLift = oData.aLiftPeople || oData.aDownPeople, //TODO: remove aDownPeople
    			i = 0;
    			
    		for( i = 0; i < aPeopleGoingDownFromElevator.length; i++ ) {
    			aPeopleArrivedAtFloor.push( aPeopleLift[i] );
    		}
    		delete aPeopleLift;
    
    		for( i = 0; i < nLengthQueue; i++ ) {
    			box.publish( sFloor, "addPersonElevator", oDoorQueue.shift );
    		}		
    	}
    		
    	/**
    	 * When someone can not enter to the elevator, the person is managed as if it was a new
    	 * person in the floor.
    	 * @param {Object} oPerson is the person returned from the elevator.
    	 */
    	function returnToEntrance( oPerson ){
    		box.publish( sFloor, "addPerson", oPerson );		
    	}
    	
    	/**
    	 * Places the person on the waiting queue of the floor in order to start its journey.	
    	 * @param  {Object} oPerson is the person to be placed.
    	 */
    	function addNewPerson( oPerson ){
    		oWaitingQueue.push(oPerson);
    		movePersonFromWaitingToControlPanelQueue();
    	}
    
        /**
         * Gets general information about the floor statistics.
         * @return {Object} containing the following information:
         *      oWaitingQueueInformation {Object} Waiting Queue Information
         *          nCurrent {Number} the current number of people in the waiting queue.
         *      oPanelQueuesInformation {Object} Panel Queues Information (for each panel)
         *          nCurrent {Number} the number of people in the panel queue.
         *          nTotal {Number} the total number of people that used the panel queue.
         *      oElevatorQueuesInformation {Object} Elevator Queues Information (for each elevator)
         *          nCurrent {Number} the number of people in the elevator queue.
         *          nTotal {Number} the total number of people that used the elevator queue.
         */
        function  getInformation(){
            var oInformation = {},
                sPanel = "",
                sElevator = "";
                
            oInformation.oWaitingQueueInformation = {};
            oInformation.oWaitingQueueInformation.nCurrent = oWaitingQueue.length();
            
            oInformation.oPanelQueuesInformation = {};
            for( sPanelName in oControlPanelQueue ) {
                oInformation.oPanelQueuesInformation[sPanelName] = {};
                oInformation.oPanelQueuesInformation[sPanelName].nCurrent = oControlPanelQueue[sPanelName].length();
                oInformation.oPanelQueuesInformation[sPanelName].nTotal = oControlPanelQueueTotalPeople[sElevator];
            }
            oInformation.oElevatorQueuesInformation = {};
            for( sElevator in oControlPanelQueue ) {
                oInformation.oElevatorQueuesInformation[sElevator] = {};
                oInformation.oElevatorQueuesInformation[sElevator].nCurrent = oControlPanelQueue[sElevator].length();
                oInformation.oElevatorQueuesInformation[sElevator].nTotal = oDoorQueueTotalPeople[sElevator];
            }
            
            oInformation.oArrivalQueueInformation = {};
            oInformation.oArrivalQueueInformation.nCurrent = aPeopleArrivedAtFloor.length;
            
            return oInformation;
        }
        
        /**
         * Publishes the information requested about the floor.
         */
        function informationDemandResponse() {
          var oInformation = getInformation();
          box.publish( sFloor, "responseInformation", oInformation );
        }
    
        
        /**
         * Subscribe the module to all channel and events necessary to work correctly.
         * @param {Number} nFloor the number of the floor to be initialized.
         */
        function initializeSubscriptions( nFloor ){
            nFloor = nFloor || 0;
            sFloor = "floor-" + nFloor;
            
            box.subscribe( sFloor, "addPerson", addNewPerson );
            box.subscribe( sFloor, "responseAssignedElevator", movePersonFromControlPanelToDoorQueue );
            box.subscribe( sFloor, "openDoor", openDoor );
            box.subscribe( sFloor, "requestInformation", informationDemandResponse );
            box.subscribe( sFloor, "exededWeight", returnToEntrance );
            box.subscribe( sFloor, "readyToAddPeople", manageElevatorEntry );
        }
        
        /**
         * Initializes the module with the necessary structures and subscriptions to other channels.
         * @param {Number} nControlPanel is the number of control panel in the floor.
         * @param {Number} nElevator is the number of elevators in the floor.
         * @param {Number} nFloor is the identificator of the floor inside the building.
         */
        function _init( nControlPanel, nElevator, nFloor ){
            var nControlPanel = nControlPanel || 1,
                nElevator = nElevator || 1,
                sControlPanelName = "",
                sElevatorName = "";
            
            for( i = 0; i < nControlPanel; i++ ){
                sControlPanelName = i + "";
                oControlPanelQueue[sControlPanelName] = new Queue();
                oControlPanelQueueTotalPeople[sControlPanelName] = 0;
            }
            
            for( i = 0; i < nElevator; i++ ) {
                sElevatorName = Configuration.aElevatorNames[i] || i + "";
                oDoorQueue[sElevatorName] = new Queue();
                oDoorQueueTotalPeople[sElevatorName] = 0;
            }
            
            initializeSubscriptions( nFloor );
        }
        
    	return{
    		init : _init
    	}
    });
}( document, window ));
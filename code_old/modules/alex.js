var Person = function(nOrigin, nDestination, nTimeStart, sPanel, nWeight, sName){
	nFloorOrigin = nOrigin || 0;
	this.nFloorDestination = nDestination || 1;
	this.nTimeStart = nTimeStart || 0;
	this.nTimeFinish = nTimeStart || 0;
	this.sPanel = sPanel || "A";
	this.nWeight = nWeight || 75;
	this.sName = sName || "alex";
}
Person.prototype.addTime = function(nTime){
	this.nTimeFinish = this.nTimeFinish + nTime;
}
Person.prototype.setTime = function(nTime){
	this.nTimeStart = nTime;
}
Person.prototype.getPanel = function(){
	return this.sPanel;
}
Person.prototype.getWeight = function(){
	return this.weight;
}
var Queue = function() {
	this.aElement = [];
}

Queue.prototype.push = function(oElement){
	this.aElement.push(oElement);
}
Queue.prototype.shift = function(){
	return this.aElement.shift();
}
Queue.prototype.length = function(){
	return this.aElement.length;
}
Queue.prototype.getFirstElement = function(){
	return this.aElement[0];
}
Queue.prototype.hasMoreElements = function(){
	return this.aElement > 0;
}

var Observer = function(){
	this.aList = [];
}
Observer.prototype.subscribe = function(fnCallback){
	this.aList.push(fnCallback);
}
Observer.prototype.publish = function(){
	var i = 0,
		nLength = this.aList.length;
	for(; i < nLength; ++i){
		this.aList[i]();
	}
}

var instance;
;(function (doc, win, _undefind_ ){
Core.register("Floor", function (box){
	var nFloor,					//this is the id of the floor
		sFloor,
		aDoors = [], 
		aControlPanel = [],			//this property is possible unnecessary
		oControlPanelQueue = {},
		oDoorQueue = {},
		oWaitingQueue = new Queue(),	//this is the queue for entry in the sistem
		oObserver = new Object(),
		nSetIntervaId = 0;

	/**
	 * This function move the person from the entrance queue to the panel queue
	 * @param  {Object} oPerson Person for move
	 * @athor Alexander Flores
	 */
	_AddPersonToControlPanelQueueFromWaitingQueue = function (){	
		var oPerson = oWaitingQueue.shift(),
			sPanel = oPerson.getPanel();
			//comprove if exist the queue
		oControlPanelQueue[sPanel].push(oPerson);
		if(oControlPanelQueue[sPanel].length() === 1){
			_RequestElevator(sPanel);
		}		


	}
	/**
	 * This function move the person from the controlPanel queue to the elevator queue
	 * @param  {Object} oPerson Person for move
	 * @athor Alexander Flores
	 */
	_AddPersonToDoorQueueFromControlPanelQueue = function (oData){
		var sDoor = oData.sElevatorName || "A",
			sPanel = oData.sControlPanel || "A",
			oPerson = oControlPanelQueue[sPanel].shift();			
		oDoorQueue[sDoor].push(oPerson);
		if( oControlPanelQueue[sPanel].hasMoreElements() ){
			_RequestElevator(sPanel);
		}


	}
	/**
	 * This function requets the elevalor
	 * @param { String } sPanel this is the panel  who make the request
	 * @author Alexander Flores
	 */
	_RequestElevator = function(sPanel){
		if( oControlPanelQueue[sPanel].hasMoreElements() ){
			//with this obtais the first person from the queue panel.
			oPerson = oControlPanelQueue[sPanel].getFirstElement();
			oDestinationFloor =  { "nFloorDest" : oPerson.getDestination(), "sControlPanel" : sPanel };
			box.publish("floor-" + nFloor,"requestElevator",oDestinationFloor);

console.log("he pedido el ascensor");
		}

	}
	/**
	 * This function put all the person into the elevator
	 * @param  {String} sDoor this is the identify from the elvator queue 
	 */
	_OpenedDoorHandler = function (oData){
console.log("se abren puertas del ascensor")
		var sDoor = oData.sElevatorName || "A";
		box.publish("elevator-" + sDoor, "doorIsOpen", {});
	}
	_putPersons = function(oData){
console.log("se añaden personas al ascensor");
		var sDoor = oData.sElevatorName || "A",
			nLengthQueue = oDoorQueue[sDoor].length(),
			i = 0;
console.log(nLengthQueue);
		for(; i < nLengthQueue; ++i){
console.log(oDoorQueue[sDoor]);
			box.publish(sFloor, "addPersonElevator", oDoorQueue.shift);
		}		
	}
	/**
	 * This module subscribe in all the channels 
	 * @param  {[type]} nData [description]
	 * @return {[type]}       [description]
	 */
	_subscribeSystem = function (nData){
		nFloor = nData || 0;
		sFloor = "floor-" + nFloor;
console.log("Estamos en suscribe");
		box.subscribe(sFloor,"addPerson", _AddWaitingPerson);
		box.subscribe(sFloor, "responseAssignedElevator", _AddPersonToDoorQueueFromControlPanelQueue);
		box.subscribe(sFloor,"openDoor", _OpenedDoorHandler);
  		box.subscribe(sFloor, "requestInformation", _responseInformationCallback);
  		box.subscribe(sFloor, "exededWeight", _returnToEntrance);
  		box.subscribe(sFloor,"readyToAddPeople", _putPersons)
	}
	_returnToEntrance = function(oPerson){
		box.publish(sFloor,"addPerson", oPerson);		
	}
	/**
	 * When this function called insert new person in the floor if the floor is empty 		
	 * @param  {object} Person This is the new person
	 * @author Alexander Flores
	 * @return {[type]}        [description]
	 */
	_AddWaitingPerson = function (oPerson){
console.log("has añadido una porsona");
		oWaitingQueue.push(oPerson);
		_AddPersonToControlPanelQueueFromWaitingQueue();
	}
	_PutIntervals = function(){

		setInterval(_RequestElevator("A"),500);
	}

	_init = function(nControlPanel, nElevator, nFloor){
		//This is for future implementation
		var i = nControlPanel || 1,
			j =	nElevator || 1;
		//
		
		oControlPanelQueue["A"] = new Queue();
		oDoorQueue["A"] = new Queue();
		_subscribeSystem(nFloor);
		//_PutIntervals();
	}

    /**
     * Callback for response information
     */
    _responseInformationCallback = function () {
      var oInformation = _getInformation();
      box.publish(sFloor, "responseInformation", oInformation);
    }
    /**
     * Get general information of the queues and statistics
     * @author Jose Luis Orta
     * @return {Object} Object that contains information
     */
    _getInformation =  function(){
		var oInformation = {},
			sPanel = "",
			sElevator = "";
			
		oInformation.oWaitingQueueInformation = {};
		oInformation.oWaitingQueueInformation.nCurrent = oWaitingQueue.length();
		
		oInformation.oPanelQueuesInformation = {};
		for( sPanelName in oControlPanelQueue ) {
			oInformation.oPanelQueuesInformation[sPanelName] = {};
			oInformation.oPanelQueuesInformation[sPanelName].nCurrent = 1;
			oInformation.oPanelQueuesInformation[sPanelName].nTotal = 2;
		}
		oInformation.oElevatorQueuesInformation = {};
		for( sElevator in oControlPanelQueue ) {
			oInformation.oElevatorQueuesInformation[sElevator] = {};
			oInformation.oElevatorQueuesInformation[sElevator].nCurrent = 10;
			oInformation.oElevatorQueuesInformation[sElevator].nTotal = 500;
		}
		
		oInformation.oArrivalQueueInformation = {};
		oInformation.oArrivalQueueInformation.nCurrent = 0;
		
		return oInformation;
    }
	return{
		init : _init,
		AddPersonToControlPanelQueueFromWaitingQueue : _AddPersonToControlPanelQueueFromWaitingQueue,
		AddPersonToDoorQueueFromControlPanelQueue : _AddPersonToDoorQueueFromControlPanelQueue,
		RequesElevator : _RequestElevator,

	}
});

instance = Core.start("Floor", "flor1", "hello world");
})(document, window)

var a = new Person();
var b = new Person();
var c = new Person();
Core.Communication.publish("floor-0", "addPerson", a);
Core.Communication.publish("floor-0", "addPerson", b);
Core.Communication.publish("floor-0", "addPerson", c);
Core.Communication.publish("floor-0", "responseAssignedElevator", "A");
Core.Communication.publish("floor-0", "responseAssignedElevator", "A");
Core.Communication.publish("floor-0", "openDoor", "A");
Core.Communication.publish("floor-0", "readyToAddPeople", "A");
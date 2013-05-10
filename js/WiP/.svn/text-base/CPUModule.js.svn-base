;(function ( doc, win, ns, Configuration, _undefined_ ) {
    "use strict";

    Core.register( "CPU", function ( oBox ) {

        var oCallbacks = {},
            oCPU = new ns.model.CPU();
            aPendentRequest = [];
              
        /**
         * Manages elevator requests from the floors and publish one message to the same floor with the information
         * of which elevator is assigned to the request and another to the elevator in order to stop in the floor 
         * where the request was done.
         * @param {Number} nFloor is the floor that published the 'doorClosed' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageFloorRequestElevator( nFloor, oData ) {
            var sSelectedElevator,
                oRequest,
                oResponse,
                nNewFloor,
                bAddStops,
                bPetitionAccessed;
            
            sSelectedElevator = oCPU.requestElevator( nFloor, oData.nFloorDest );
            
            /**
             * If the result is false it means that there is no elevator available and the user needs to wait for a
             * response and will be address.
             */
            if( sSelectedElevator === undefined ){
                oRequest = {};
                oRequest.oData = oData;
                oRequest.nFloor = nFloor;
                aPendentRequest.push( oRequest );
                bPetitionAccessed = false;
            }
            /**
             * If an elevator is assigned, the elevator is said to stop on the floor where the request is done.
             */
            else {
                /**
                 * Both stops are added to the stops queue of the correct direction.
                 */
                bAddStops = oCPU.addTripToElevator( sElevator, nFloor, oData.nFloorDest );
                if( bAddStops ) {
                    oBox.publish( "elevator-" + sElevator, "addStopFloor", nFloor );
                    oBox.publish( "elevator-" + sElevator, "addStopFloor", oData.nFloorDest );
                }
                oResponse = {
                    sElevatorName : sSelectedElevator,
                    nControlPanel : oData.nControlPanel
                };
                oBox.publish( "floor-" + nFloor, "responseAssignedElevator", oResponse );
                bPetitionAccessed = true;
            }
            
            return bPetitionAccessed;
        }
        
        /**
         * @param {Number} nFloor is the floor that published the 'doorClosed' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageFloorDoorClosing( nFloor, oData ) {
            var sElevator = oData.sElevatorName,
                nNewFloor,
                i,
                oRequest;
            
            if( oElevatorInfo[sElevator].bReset ) {
                oBox.publish( "elevator-" + sElevator, "reset", { nFloor: 0 } );
            }
            else if( oElevatorInfo[sElevator].bStopped ) {
            
                if( oElevatorInfo[sElevator].bInDirectionChange ) {
                    nNewFloor = this.oCPU.oElevatorInfo[sElevator].aFloorsForNextStopList[0];
                    oBox.publish( "elevator-" + sElevator, "addStopFloor", { nFloor: nNewFloor } );
                }
                else if( this.oCPU.oElevatorInfo[sElevator].aFloorsForNextStopList.length !== 0 ) {
                        for( i = 0; i < this.oCPU.oElevatorInfo[sElevator].aFloorsForNextStopList.length; i++ ) {
                            nNewFloor = this.oCPU.oElevatorInfo[sElevator].aFloorsForNextStopList[i];
                            oBox.publish( "elevator-" + sElevator, "addStopFloor", { nFloor: nNewFloor } );
                        }
                }
                
            }
            else {
                oBox.publish( "elevator-" + sElevator, "continue", {} );
            }
            
            
            //TODO: new function with that
            if( aPendentRequest.length !== 0 ) {
                oRequest = aPendentRequest.shift();
                if( !manageFloorRequestElevator( oRequest.nFloor, oRequest.oData ) ) {
                    aPendentRequest.unshift( oRequest );
                }
            }
        }
        
        /**
         * TODO: Does nothing at the moment.
         * Manages the information that elevators produce in every floor so the system knows at any moment 
         * where the elevator is.
         * @param {String} sElevator is the name of the elevator that published the 'inFloor' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageElevatorInFloor( sElevator, oData ) {
        
            oCPU.updateElevatorMoved( sElevator, oData.nFloor, oData.sDirection, false, false );
            
        }
        
        /**
         * Manages the information the elevator produces when stops in a floor and publishes to the where it is 
         * stopped floor that the elevator is there to open the corresponding door and if the elevator has
         * nothing more to do publishes a message to reset its state.
         * @param {String} sElevator is the name of the elevator that published the 'stoppedInFloor' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageElevatorStoppedInFloor( sElevator, oData ) {
            
            oCPU.updateElevatorMoved( sElevator, oData.nFloor, oData.sDirection, true, oData.bFinished );
            
            oBox.publish( "floor-" + oData.nFloor, "openDoor", {} );
        }
        
        
        /**
         * Initializes the subscriptions in the floor channel.
         * Each subscription will be done to every floor in the system and there will be an unique callback
         * for every floor and event.
         */
        function initializeFloorSubscriptions() {
            var nFloors = Configuration.nFloors,
                i = 0;
                
            oCallbacks.requestElevator = [];
            oCallbacks.doorClosed = [];
                
            for( i = 0; i < nFloors; i++ ) {
                
                (function( nFloor ){    
                
                    oCallbacks.requestElevator.push( 
                        function( oData ){
                            manageFloorRequestElevator( nFloor, oData );
                        } 
                    );
                    
                    oCallbacks.doorClosed.push( 
                        function( oData ){
                            manageFloorDoorClosing( nFloor, oData );
                        } 
                    );
                    
                }( i ));
                
                oBox.subscribe( "floor-" + i, "requestElevator", oCallbacks.requestElevator[i] );
                oBox.subscribe( "floor-" + i, "doorClosed", oCallbacks.doorClosed[i] );  
            }
        }
        
        /**
         * Initializes the subscriptions in the elevator channel.
         * Each subscription will be done to every elevator in the system and there will be an unique
         * callback for every elevator and event.
         */
        function initializeElevatorSubscriptions() {
            var aElevatorNames = Configuration.aElevatorNames,
                nElevators = Configuration.nElevators,
                i = 0;
                
            oCallbacks.inFloor = [];
            oCallbacks.stoppedInFloor = [];
               
            for( i = 0; i < nElevators; i++ ) {
                
                (function( sElevator ){    
                
                    oCallbacks.inFloor.push( 
                        function( oData ){
                            manageElevatorInFloor( sElevator, oData );
                        } 
                    );
                    
                    oCallbacks.stoppedInFloor.push( 
                        function( oData ){
                            manageElevatorStoppedInFloor( sElevator, oData );
                        } 
                    );
                    
                }( aElevatorNames[i] ));
                
                oBox.subscribe( "elevator-" + aElevatorNames[i], "inFloor", oCallbacks.inFloor[i] );                    
                oBox.subscribe( "elevator-" + aElevatorNames[i], "stoppedInFloor", oCallbacks.stoppedInFloor[i] ); 
                
                oElevatorInfo[aElevatorNames[i]] = {};
                
            }
        }
        
        return {
            /**
             * Initializes all the subscriptions of the module (all floor and elevator channels in the system).
             */
            init: function () {
                initializeFloorSubscriptions();
                initializeElevatorSubscriptions();
                this.oCPU.initialize("A");
            }
        };
    });
}( document, window, Namespace, Namespace.context.configuration ));
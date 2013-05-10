

/**
 * This module manages all the events recieved and published from the CPU.
 * @author Enric Sangrà
 */
;(function ( doc, win, ns, _undefined_ ) {
    "use strict";
    
    Core.register( "CPU", function ( oBox ) {

        var oCallbacks = {},
            oCPUAI = new ns.classes.BuildingAI();
        
        oCPUAI.initializeRules();
        
        /**
         * Manages elevator requests from the floors and publish one message to the same floor with the information
         * of which elevator is assigned to the request and another to the elevator in order to stop in the floor 
         * where the request was done.
         * @param {Number} nFloor is the floor that published the 'doorClosed' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageFloorRequestElevator( nFloor, oData ) {
            var aElevatorNames = Configuration.aElevatorNames,
                oResponse = {
					sControlPanel : oData.sControlPanel,
                    sElevatorName : aElevatorNames[0]
                },
                sSelectedElevator = "",
                i = 0;

console.log( "requested from " + nFloor + " to " + oData.nFloorDest );

            //Show elevator assigned
            oBox.publish( "floor-" + nFloor, "responseAssignedElevator", oResponse );
            
            //TODO: function to get this from the elevator or some kind of manager.
            for( i = 0; i < aElevatorNames.length; i++ ){
                oCPUAI.addElevatorInfo( "A", {aUpStops : [], aDownStops : []} );
            }
            sSelectedElevator = oCPUAI.assignElevator( nFloor, oData.nFloorDest ) || aElevatorNames[0];
            
console.log( "elevator: " + sSelectedElevator );
            //Sends Elevator
            oBox.publish( "elevator-" + sSelectedElevator, "addStopFloor", {nFloor: oData.nFloorDest} );
        }
        
        /**
         * TODO: Maybe to change the event name from the publish.
         *
         * @param {Number} nFloor is the floor that published the 'doorClosed' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageFloorDoorClosing( nFloor, oData ) {
        
console.log( "closing doors ins " + nFloor + " and elevator " + oData.sElevatorName );

            oBox.publish( "elevator-" + oData.sElevatorName, "move" );
        }
        
        /**
         * TODO: Does nothing at the moment.
         * Manages the information that elevators produce in every floor so the system knows at any moment 
         * where the elevator is.
         * @param {String} sElevator is the name of the elevator that published the 'inFloor' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageElevatorInFloor( sElevator, oData ) {
        
        }
        
        /**
         * Manages the information the elevator produces when stops in a floor and publishes to the where it is 
         * stopped floor that the elevator is there to open the corresponding door and if the elevator has
         * nothing more to do publishes a message to reset its state.
         * @param {String} sElevator is the name of the elevator that published the 'stoppedInFloor' event.
         * @param {Object} oData is the data from the publish.
         */
        function manageElevatorStoppedInFloor( sElevator, oData ) {
            var oResponse = {
                sElevatorName: sElevator
            };

            oBox.publish( "floor-" + oData.nFloor, "openDoor", oResponse );
            
console.log( "elevator " + sElevator + " stopped in floor " + oData.nFloor );

            if( oData.bFinished ) {
                oBox.publish( "elevator-" + sElevator, "reset", {nFloor: 0} );
            }
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
                
            }
        }
        
        return {
            /**
             * Initializes all the subscriptions of the module (all floor and elevator channels in the system).
             */
            init: function () {
                initializeFloorSubscriptions();
                initializeElevatorSubscriptions();
            }
        };
    });
}( document, window, Namespace ));
var Namespace = Namespace || {};
Namespace.classes = Namespace.classes || {};

/**
 * BuildingAI is a class which inherits from AI. 
 * It has its own methods but is a rule based AI as the AI is.
 * It manages all the logic that the CPU needs.
 * @author Enric Sangrà
 */
;(function( win, doc, ns ){
    "use strict";
    
    var BuildingAI;
   
    ns.classes.BuildingAI = function() {
        this.oElevatorInfo = {};
    };
    
    BuildingAI = ns.classes.BuildingAI;
    
    BuildingAI.prototype = new ns.classes.AI();
    BuildingAI.constructor = BuildingAI;
    
    /**
     * It is necessary to have a correct answer when the AI is asked for results.
     * @param {String} sElevatorName is the name of an elevator.
     * @param {Object} oInfo is the information of the elevator.
     */
    BuildingAI.prototype.addElevatorInfo = function( sElevatorName, oInfo ) {
        this.oElevatorInfo[sElevatorName] = oInfo;
    };
    
    /**
     * It searchs for the best elevator to take from one floor to another using a likelihood based 
     * decision AI.
     * @param {Number} nPetitionFloor is the floor where the petition of an elevator is done.
     * @param {Number} nDesiredFloor is where the user wants to go from the petition floor.
     * @return {String} the name of the elevator that should be taken.
     */
    BuildingAI.prototype.assignElevator = function( nPetitionFloor, nDesiredFloor ) {
        var oContext,
            nResult,
            nGreatestLikelihood = -1,
            sElevatorSelected = "",
            sKey = "";
            
        for( sKey in this.oElevatorInfo ){
            oContext = this.oElevatorInfo[sKey];
            //RI = Rule Information
            oContext.nRIPetitionFloor = nPetitionFloor;
            oContext.nRIDesiredFloor = nDesiredFloor;
            nResult = this.executeRules( oContext );
            if( nResult > nGreatestLikelihood ) {
                sElevatorSelected = sKey;
                nGreatestLikelihood = nResult;
            }
        }
        
        return sElevatorSelected;
    };
    
    /**
     * Initializes all the rules necessary to use the AI correctly.
     */
    BuildingAI.prototype.initializeRules = function() {
        /**
         * Penalizes for every floor where the elevator stops and it is not the desired ibe,.
         */
        function desiredFloorInStops( oContext ){
            var nResult = 1,
                aStops = (oContext.nRIPetitionFloor < oContext.nRIDesiredFloor )? oContext.aUpStops : oContext.aDownStops,
                i = 0;
                
            for( i = 0; i < aStops.length; i++ ) {
                if( aStops[i] === oContext.nRIDesiredFloor ) {
                    nResult *= 1;
                }
                else {
                    nResult *= 0.8;
                }
            }
            
            return nResult;
        }
        this.addRule( desiredFloorInStops );

        /**
         * Penalizes for every floor where the elevator stops and it is not the petition one.
         */
        function petitionFloorInStops( oContext ){
            var nResult = 1,
                aStops = (oContext.nRIPetitionFloor < oContext.nRIDesiredFloor )? oContext.aUpStops : oContext.aDownStops,
                i = 0;
            
            for( i = 0; i < aStops.length; i++ ) {
                if( aStops[i] === oContext.nRIPetitionFloor ) {
                    nResult *= 1;
                }
                else {
                    nResult *= 0.8;
                }
            }
            
            return nResult;
        }
        this.addRule( petitionFloorInStops );
    };

}( window, document, Namespace ));


/*var bAI = new Namespace.classes.BuildingAI();
bAI.addElevatorInfo( "A", {} );
bAI.addElevatorInfo( "B", {} );
console.log( bAI.assignElevator( 1,2 ) );

bAI.initializeRules();
bAI.addElevatorInfo( "A", { aUpStops : [1,2,3] } );
bAI.addElevatorInfo( "B", { aUpStops : [1,2] } );
console.log( bAI.assignElevator( 1,2 ) );*/
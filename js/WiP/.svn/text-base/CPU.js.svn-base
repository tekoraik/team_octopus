var Namespace = Namespace || {};
Namespace.model = Namespace.model || {};

/**
 * @author Enric Sangrà
 */

;(function( win, doc, ns ){
    "use strict";
    
    function sortNumbersAscendent( nFirst, nSecond ) {
        return nFirst - nSecond;
    }
        
    function sortNumbersDescendent( nFirst, nSecond ) {
        return nSecond - nFirst;
    }
    
    /**
     * Removes all duplicates from the array passed. 
     * If last elements are undefined they will be removed.
     * The array is sorted in the operation so the order is not manained. TODO: change that.
     * @param {Array} aArray the array to remove the duplicates from.
     */
    function removeDuplicatesFromArray( aArray ) {
        var nIndex = aArray.length - 1,
            oLastValue;
        
        if( nIndex === 1 ) return;
        
        aArray.sort();
        
        for( nIndex = aArray.length -1, oLastValue = undefined; nIndex >= 0; nIndex-- ) {
            //oLastValue is undefined first time.
            if( oLastValue === aArray[nIndex] ) {
                aArray.splice( nIndex, 1 );
            }
            else {
                oLastValue = aArray[nIndex];
            }
        }
    }
    
    function CPU() {
        /**
         * For each elevator has an object containing:
         * @attribute {Number} nLastFloor
         * @attribute {String} sDirection
         * @attribute {Boolean} bStopped
         * @attribute {Array} aFloorsForNextStopList
         * @attribute {Array} aStopsUpList
         * @attribute {Array} aStopsDownList
         * @attribute {Boolean} bInDirectionChange
         */
        this.oElevatorInfo = {};
    };
        
        
    CPU.prototype.initialize = function( aElevatorNames ) {
        var oInfo,
            i;
        for( i = 0; i < aElevatorNames.length; i++ ) {
            oInfo = {};
            oInfo.nLastFloor = 0;
            oInfo.sDirection = "up";
            oInfo.bStopped = true;
            oInfo.aFloorsForNextStopList = [];
            oInfo.aStopsUpList = [];
            oInfo.aStopsDownList = [];
            oInfo.bInDirectionChange = false;
            oInfo.bReset = false;
            this.oElevatorInfo[aElevatorNames[i]] = oInfo;
        }
    };
    
    /**
     * Deletes from the possible elevators the ones that do not meet some boolean conditions.
     * @return {Array} list of candidate names.
     */
    CPU.prototype.preProcessingCandidateElevators = function( oElevatorInfo ) {
        //Delete the ones moving (ATM)
        var sKey,
            bStopped,
            aSelected = [];
            
        for( sKey in oElevatorInfo ) {
            //Is undefined when not initialized
            bStopped = ( oElevatorInfo[sKey].bStopped !== undefined )? oElevatorInfo[sKey].bStopped : true;
            if( bStopped ) {
                aSelected.push( sKey );
            }                
        }
        
        return aSelected;
        
        //Deleting the ones that have the same stop in the other direction. (previous condition is unnecessary);
    }
    
    /**
     * Searchs for the best elevator to handle the petition from one floor to another.
     * @param {Number} nFloorOrigin is the floor where the petition is done.
     * @param {Number} nFloorDest is the floor where the user wants to go. 
     * @return {String | Boolean} the name of the elevator that will handle the petition or false if there is none.
     */
    CPU.prototype.requestElevator = function( nFloorOrigin, nFloorDest ) {
        var aCandidate,
            sElevatorSelected;
        
        aCandidate = this.preProcessingCandidateElevators( this.oElevatorInfo );
        
        sElevatorSelected = aCandidate[0]; //should use some 'selector' function.
        
        return sElevatorSelected;
    };

    /**
     *
     * @param {String} sElevator
     * @param {Number} nFloorOrigin
     * @param {Number} nFloorDest
     */
    CPU.prototype.addTripToElevator = function( sElevator, nFloorOrigin, nFloorDest ) {
                
        var oSelectedElevatorInfo = this.oElevatorInfo[sElevator], //What if it is undefined?
            aList = [],
            bAscendent = true,
            bAssignedInCurrentList = false; 
        
        //Initializes the arrays if they are not initialized
        oSelectedElevatorInfo.aFloorsForNextStopList = oSelectedElevatorInfo.aFloorsForNextStopList || [];
        oSelectedElevatorInfo.aStopsUpList = oSelectedElevatorInfo.aStopsUpList || [];
        oSelectedElevatorInfo.aStopsDownList = oSelectedElevatorInfo.aStopsDownList || [];
        
        if( nFloorOrigin < nFloorDest ) {
            bAscendent = true;
            //TODO: Maybe the door is still open...
            if( oSelectedElevatorInfo.sDirection === "up" && 
                ( oSelectedElevatorInfo.nLastFloor < nFloorOrigin || 
                    ( oSelectedElevatorInfo.nLastFloor ===  nFloorOrigin && oSelectedElevatorInfo.bStopped ) 
                ) && !oSelectedElevatorInfo.bInDirectionChange ){
                aList = oSelectedElevatorInfo.aFloorsForNextStopList;
                bAssignedInCurrentList = true;
            }
            else {
                aList = oSelectedElevatorInfo.aStopsUpList;
            }
        }
        else {
            bAscendent = false;
            if( oSelectedElevatorInfo.sDirection === "down" && 
                ( oSelectedElevatorInfo.nLastFloor > nFloorOrigin || 
                    ( oSelectedElevatorInfo.nLastFloor ===  nFloorOrigin && oSelectedElevatorInfo.bStopped ) //Not Sure
                )
                && !oSelectedElevatorInfo.bInDirectionChange ) {
                aList = oSelectedElevatorInfo.aFloorsForNextStopList;
                bAssignedInCurrentList = true;
            }
            else {
                aList = oSelectedElevatorInfo.aStopsDownList;
            }
        }
        
        aList.push( nFloorOrigin );
        aList.push( nFloorDest );
        
        removeDuplicatesFromArray( aList );
        
        //Sort to do the stops in correct order...
        if( bAscendent ){
            aList.sort( sortNumbersAscendent );
        }
        else {
            aList.sort( sortNumbersDescendent );
        }
        
        //Indicates if the stop is in aFloorsForNextStopList so it is added before stopping to the list of the elevator.
        return bAssignedInCurrentList;
        
    };
    
    /**
     * Updates the elevator information with the current floor, direction and state.
     * @param {String} sElevator is the name of the elevator to update the information to.
     * @param {Number} nFloor is the identificator of the current floor where the elevator is.
     * @param {String} sDirection is the direction of the elevator (up or down).
     * @param {Boolean} bStopped indicates if the state is stopped or not.
     */
    CPU.prototype.updateElevatorMoved = function( sElevator, nFloor, sDirection, bStopped, bFinished ) {
        var aStopList = [],
            aStopsDownList,
            aStopsUpList,
            nIndex;
        
        this.oElevatorInfo[sElevator] = this.oElevatorInfo[sElevator] || {};
        
        this.oElevatorInfo[sElevator].nLastFloor = nFloor;
        this.oElevatorInfo[sElevator].sDirection = sDirection;
        this.oElevatorInfo[sElevator].bStopped = bFinished;
        
        if( bStopped ) {
        
            this.oElevatorInfo[sElevator].aFloorsForNextStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList || [];
            aStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList;
                        
            //It does only delete the stop if it was in the list (it is supposed to be because the elevator stopped).
            nIndex = aStopList.indexOf( nFloor );
            if( nIndex !== -1 ) {
                aStopList.splice( nIndex, 1 );
            }
            
            if( this.oElevatorInfo[sElevator].bInDirectionChange ) {
                if( this.oElevatorInfo[sElevator].sDirection === "up" ) {
                    this.oElevatorInfo[sElevator].sDirection = "down";
                }
                else if( this.oElevatorInfo[sElevator].sDirection === "down" ) {
                    this.oElevatorInfo[sElevator].sDirection = "up";
                }
                
                this.oElevatorInfo[sElevator].bInDirectionChange = false;
            }
            
            if( aStopList.length === 0 && !this.oElevatorInfo[sElevator].bReset ) { 
            
                //if( !this.oElevatorInfo[sElevator].bInDirectionChange ) {
                
                    if( sDirection === "up" ) {
                        this.oElevatorInfo[sElevator].aFloorsForNextStopList = this.oElevatorInfo[sElevator].aStopsDownList.slice();
                        aStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList;
                        this.oElevatorInfo[sElevator].aStopsDownList = [];
                        if( aStopList.length === 0 ) {
                            this.oElevatorInfo[sElevator].aFloorsForNextStopList = this.oElevatorInfo[sElevator].aStopsUpList.slice();
                            aStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList;
                            this.oElevatorInfo[sElevator].aStopsUpList = [];
                        }
                    }
                    if( sDirection === "down" ) {
                        this.oElevatorInfo[sElevator].aFloorsForNextStopList = this.oElevatorInfo[sElevator].aStopsUpList.slice();
                        aStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList;
                        this.oElevatorInfo[sElevator].aStopsUpList = [];
                        if( aStopList.length === 0 ) {
                            this.oElevatorInfo[sElevator].aFloorsForNextStopList = this.oElevatorInfo[sElevator].aStopsDownList.slice();
                            aStopList = this.oElevatorInfo[sElevator].aFloorsForNextStopList;
                            this.oElevatorInfo[sElevator].aStopsDownList = [];
                        }
                    }
                    
                    //If it is still 0 after swaps: reset
                    if( aStopList.length === 0 ) {
                        this.oElevatorInfo[sElevator].bReset = true;
                    }
                    else {
                        this.oElevatorInfo[sElevator].bInDirectionChange = true;
                    }
                    
                //}
            }
            
            //if( this.oElevatorInfo[sElevator].bReset ){
                this.oElevatorInfo[sElevator].bReset = false;
            //}
        }
        
    }
            
    //Adds it to the namespace.
	ns.model.CPU = CPU;

}( window, document, Namespace ))
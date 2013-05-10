;( function ( doc, win, myClass, _undefined_ ) {
    "use strict";
    
    /**
     * Controls all functionality of elevator, add its stopped
     * @author Regino Ballester, Rafael Yepes
     * @param  {Object} oBox
     * @param  {Number} _nCurrentFloor   Current elevator position 
     * @param  {Object} _oPendingStops
     * @param  {String} _sElevatorName   
     * @param  {Number} _nNumberOfFloors 
     * @param  {Object} _oFloorIterator  Include methods of iterator pattern
     * @param  {String} _sChannelName 
     * @param  {Boolean} _bFinished
     * @return {Object}  
     */
    Core.register( "elevator", function ( oBox ) {
        var _sDirection,
            _nCurrentFloor,
            _oPendingStops = {},
            _nCurrentWeight,
            _nMaxWeight = 500,
            _sElevatorName,
            _nNumberOfFloors,
            _oFloorIterator,
            _sChannelNameElevator = "elevator-",
            _sChannelNameFloor = "floor-",            
            _bFinished,
            _oCurrentPersonIntoElevator = {},            
            _oElevatorInformationStatics = {};

        /**
         * Return what is elevator direction 
         * @author Regino Ballester, Rafael Yepes
         * @param  {Number} _nDestinationFloor
         * @return {String}
         */
        function _calculateDirection( _nDestinationFloor ) {
            return ( _nDestinationFloor > _nCurrentFloor ) ? "up" : "down";
        }

        /**
         * Include a stop floor in elevator
         * @author Regino Ballester, Rafael Yepes
         * @param {Object} oData Object that contains property floor with respective stop
         */
        function _addStop( oData ) {
            var _nFloor = oData.floor;

            _oPendingStops[_nFloor] = _nFloor;
            if ( _bFinished ) {
                _bFinished = false;
                _sDirection = _calculateDirection( _nFloor );
                _oElevatorInformationStatics.sCurrentDirection = _sDirection;
            }
        }

        /**
         * Return if there are any pending stops
         * @author Regino Ballester, Rafael Yepes
         * @return {Boolean} 
         */
        function _hasPendingStops() {
            var _oProperties;

            for ( _oProperties in _oPendingStops ) {
                return _oProperties.hasOwnProperty( _oProperties );
            }
        }

        /**
         * Deletes current floor from pending stops
         * @author Regino Ballester, Rafael Yepes
         */
        function _deleteCurrentFloorFromPendingStops() {
            delete _oPendingStops[_nCurrentFloor];
        }

        /**
         * Wrapped function used to do a setTimeout in the _moveToNextStop function. This function
         * move the elevator the the next floor in the current direction that the elevator is
         * moving with the iterator updates the information needed and then continues the moving the
         * next stop.
         * @author Regino Ballester, Rafael Yepes
         */
        function _moveToNextFloor() {
            _nCurrentFloor = ( _sDirection === "up" ) ?
                _oFloorIterator.getNextFloor() : _oFloorIterator.getPreviousFloor();
            _oElevatorInformationStatics.nTotalTraveledFloors++;
            oBox.publish( _sChannelNameElevator, "inFloor", 
                {"nFloor" : _nCurrentFloor,
                 "sDirection" : _sDirection} );
            _moveToNextStop();
        }

        /**
         * Moves elevator to next stop, checks if it has to stop in the current floor
         * or go to next floor in its direction
         * @author Regino Ballester, Rafael Yepes
         */
        function _moveToNextStop() {
            if ( _oPendingStops[_nCurrentFloor] ) {
                _deleteCurrentFloorFromPendingStops();
                oBox.publish( _sChannelNameElevator, "inFloor", 
                    {"nFloor" : _nCurrentFloor,
                     "sDirection" : _sDirection} );
                oBox.publish( _sChannelNameElevator, "stoppedInFloor",
                    {"nFloor" : _nCurrentFloor,
                     "sDirection" : _sDirection,
                     "bFinished": !_hasPendingStops()} );
            } else {
                /**
                 * We don't check if it has more pending stops. The checking is done in the CPU by
                 * checking the boolean value bFinished passed in the published event
                 * "stoppedInFloor". It also means that after finishing in the if statement we don't
                 * call the moveToNextStop itself. It will be called when the event event "continue"
                 * will be published.
                 */
                win.setTimeout( _moveToNextFloor, 1000, true );
            }
        }
        
        /**
         * The callback function to attend to the petitions of information
         * @author Rafael Yepes
         */
        _responseInformationCallback = function () {
          var oInformation = _getInformation();

          box.publish( _sChannelNameElevator, "responseInformation", _oElevatorInformationStatics );
        }

        /**
         * Initializes the elevator information object that stores information of the current
         * status of the elevator and statics about the use of the elevator
         * @author Rafael Yepes
         */
        function _initalizeElevatorStatics() {
            _oElevatorInformationStatics.nTotalTraveledFloors = 0;
            _oElevatorInformationStatics.sCurrentDirection = _sDirection;
            _oElevatorInformationStatics.nCurrentPeople = 0;
            _oElevatorInformationStatics.nTotalPeopleTransported = 0;
            _oElevatorInformationStatics.nCurrentWeight = 0;
        }

        /**
         * Checks if the person can enter to elevator
         * @param  {Object} oPerson
         * @author Regino Ballester       
         */
        function _addWeight( oPerson ) {
            var nDestination = oPerson.nFloorDestination;

            if ( ( _nCurrentWeight + oPerson.nWeight ) > _nMaxWeight ) { 
                oBox.publish( _sChannelNameFloor, "execededWeight", oPerson );            
            } else {
                _nCurrentWeight += oPerson.nWeight;
                _oElevatorInformationStatics.nCurrentWeight = _nCurrentWeight;
                _oCurrentPersonIntoElevator[nDestination] = 
                    _oCurrentPersonIntoElevator[nDestination] || [];                
                _oCurrentPersonIntoElevator[nDestination].push( oPerson ); 
                _oElevatorInformationStatics.nCurrentPeople++;
                _oElevatorInformationStatics.nTotalPeopleTransported++;
            }
            
        }

        /**
         * Upgrade the weight of the lift and the people who are in it
         * @author Regino Ballester       
         */
        function _deletePeopleIntoElevator() {            
            var aPeople = _oCurrentPersonIntoElevator.nDestination,
                nSizePeople = aPeople.length,
                oPerson,
                i = 0;

            for ( ; i < nSizePeople; i++ ) {                
                oPerson = aPeople[i];                
                _nCurrentWeight -= oPerson.nWeight;
                _oElevatorInformationStatics.nCurrentWeight = _nCurrentWeight;
                _oElevatorInformationStatics.nCurrentPeople--;            
            }                            
            delete _oCurrentPersonIntoElevator[nDestination];        
        }

        /**
         * People who have reached their destination go down from the elevator on their floor
         * @author Regino Ballester       
         */        
        function _inDestination () {            
            var _aDownPeople =  _oCurrentPersonIntoElevator[nDestination].slice() || [];           
                _deletePeopleIntoElevator(); 

            oBox.publish( _sChannelNameFloor, "readyToAddPeople",                 
                { sElevatorName : _sElevatorName,                  
                aDownPeople : _aDownPeople } );        
        }

        /**
         * Initializes  all subscribes
         */
        function _initAllSubscribes () {
            oBox.subscribe( _sChannelNameElevator, "addStopFloor", _addStop );
            oBox.subscribe( _sChannelNameElevator, "continue", _moveToNextStop );
            oBox.subscribe( _sChannelNameElevator, "reset", _addStop );
            oBox.subscribe( _sChannelNameFloor, "addPersonElevator", _addWeight );
            oBox.subscribe( _sChannelNameElevator, "doorIsOpen", _inDestination );
            oBox.subscribe( _sChannelNameElevator, "requestInformation", 
                _responseInformationCallback );
        }

        /**
         * Initializes module elevator
         * @author Regino Ballester, Rafael Yepes
         * @param  {String} sName         Name to elevator
         * @param  {Number} nFloors       Total floor in building    
         * @param  {Number} nInitialFloor Origin
         */
        function _init ( sName, nFloors, nInitialFloor ) {
            _sElevatorName = sName || "A";
            _nNumberOfFloors = nFloors || 2;
            _nCurrentFloor = nInitialFloor || 0;
            _sChannelNameElevator += _sElevatorName; 
            _sChannelNameFloor += _nCurrentFloor;                         
            _sDirection = "up";
            _bFinished = true;
            _nCurrentWeight = 0;            
            _oFloorIterator = new myClass.IteratorFloor( _nNumberOfFloors, _nCurrentFloor );
            _initAllSubscribes();
        }
        return {
            init: _init
        };
    } );
} ( document, window, Namespace.classes ) );

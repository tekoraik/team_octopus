;( function (  win, doc, Core, model, _undefined_ ) {
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
        var _oElevator,
            _sChannelNameElevator = "elevator-",
            _sChannelNameFloor = "floor-";

        /**
         * Checks if the person can enter to elevator
         * @param  {Object} oPerson
         * @author Regino Ballester
         */
        function _addPerson( oPerson ) {
            if (_oElevator.addPerson( oPerson ) === oPerson) {
                oBox.publish( _sChannelNameFloor, "execededWeight", oPerson );
            }
        }

        /**
         * People who have reached their destination go down from the elevator on their floor
         * @author Regino Ballester
         */
        function _inDestination () {
            var _nDestination = _oElevator.nCurrentFloor,
                _aDownPeople =  _oElevator.oCurrentPersonInsideElevator[_nDestination].slice() || [];

            _oElevator.peopleExitsElevator();
            oBox.publish( _sChannelNameFloor, "readyToAddPeople",
                { sElevatorName : _oElevator.sName,
                  aDownPeople : _aDownPeople } );
        }

        /**
         * The callback function to attend to the petitions of information
         * @author Rafael Yepes, Regino Ballester
         */
        function _allElevatorInformation () {
            var _oInformation = {
                sName : _oElevator.sName,
                bFinished : _oElevator.bFinished,
                aPendingStops : _oElevator.aPendingStops,
                nCurrentWeight : _oElevator.nCurrentWeight,
                nCurrentDirection : _oElevator.sDirection,
                nCurrentFloor : _oElevator.nCurrentFloor,
                nCurrentPeople : _oElevator.oInformation.nCurrentPeople,
                nTotalTraveledFloors : _oElevator.oInformation.nTotalTraveledFloors,
                nTotalPeopleTransported : _oElevator.oInformation.nTotalPeopleTransported
            };

            oBox.publish( _sChannelNameElevator, "responseInformation", _oInformation );
        }

        /**
         * Moves elevator to next stop, checks if it has to stop in the current floor
         * or go to next floor in its direction
         * @author Regino Ballester, Rafael Yepes
         */
        function _moveToNextStop() {
            if ( _oElevator.aPendingStops.indexOf(_oElevator.nCurrentFloor) !== -1 ) {
                _oElevator.peopleExitsElevator();
                oBox.publish( _sChannelNameElevator, "inFloor",
                    {nFloor : _oElevator.nCurrentFloor,
                     sDirection : _oElevator.sDirection} );
                oBox.publish( _sChannelNameElevator, "stoppedInFloor",
                    {nFloor : _oElevator.nCurrentFloor,
                     sDirection : _oElevator.sDirection,
                     bFinished: !_oElevator.hasPendingStops()} );
            } else {
                _oElevator.moveToNextFloor();
                //win.setTimeout( _moveToNextFloor, 1000, true );
            }
        }

        /**
         * The callback function to add a stop in elevator
         * @author Regino Ballester
         */
        function _addStop( nFloor ) {
            _oElevator.addStops( nFloor );
        }

        /**
         * Initializes  all subscribes
         * @author Regino Ballester
         */
        function _initAllSubscribes () {
            oBox.subscribe( _sChannelNameElevator, "addStopFloor", _addStop );
            oBox.subscribe( _sChannelNameElevator, "continue", _moveToNextStop );
            oBox.subscribe( _sChannelNameElevator, "reset",  _addStop );
            oBox.subscribe( _sChannelNameFloor, "addPersonElevator", _addPerson );
            oBox.subscribe( _sChannelNameElevator, "doorIsOpen", _inDestination );
            oBox.subscribe( _sChannelNameElevator, "requestInformation", _allElevatorInformation );
        }

        /**
         * Initializes module elevator
         * @author Regino Ballester
         * @param  {String} sName         Name to elevator
         * @param  {Number} nFloors       Total floor in building
         * @param  {Number} nInitialFloor Origin
         */
        function _init ( sName, nFloors, nInitialFloor ) {
            _oElevator = new model.Elevator( sName, nFloors, nInitialFloor );
            _sChannelNameElevator += _oElevator.sName;
            _sChannelNameFloor += _oElevator.nCurrentFloor;
            _initAllSubscribes();
        }
        return {
            init: _init,

            /**
             * Callback all unsubscribes
             * @author Regino Ballester
             */
            onDestroy: function () {
                oBox.unsubscribe( _sChannelNameElevator, "addStopFloor", _addStop );
                oBox.unsubscribe( _sChannelNameElevator, "continue", _moveToNextStop );
                oBox.unsubscribe( _sChannelNameElevator, "reset",  _addStop );
                oBox.unsubscribe( _sChannelNameFloor, "addPersonElevator", _addPerson );
                oBox.unsubscribe( _sChannelNameElevator, "doorIsOpen", _inDestination );
                oBox.unsubscribe( _sChannelNameElevator, "requestInformation", _allElevatorInformation );
            }
        };
    } );
}( window, document, Core, Namespace.model ) );

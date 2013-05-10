;(function ( doc, win, Core, config, _undefined_ ) {
    "use strict";
    Core.register( "InformationDeliverer", function ( oBox ) {
        var _oInformation = {
              floors : [],
              elevators: []
            },
            _nIntervalTime = config.informationRefreshTime || 10000,
            _sFloorChannelPrefix = "floor-",
            _sElevatorChannelPrefix = "elevator-";
        
        /**
         * Gets all information about the elevators.
         * @return {Object} oResult contains for each elevator (name) the following information:
         *      {Number} nCurrentWeight the weight currently inside the elevator.
         *      {Boolean} bMoving is true if the elevator is moving. Otherwise is false.
         *      {Number} nPosition the current or the last floor. //TODO: ask
         *      {Array} aStops are the next stop and previous stop //TODO: array? Object? More Stops?
         *      {Number} xxxx is the number of movements / maintenance status.
         */
        function _getElevatorInformation() {
            var oResult = {},
                aElevatorNames = config.aElevatorNames,
                nElevators = config.nElevators,
                i = 0;
                
            for( i = 0; i < nElevators; i++ ) {
                //oResult[aElevatorNames[i]] = Building.getElevatorInfo( aElevatorNames[i] );
            }
            
            return oResult;
        }
        
        /**
         * @return {Number} the current ratio (percentage) of happy persons in the system.
         */
        function _getHappyPeopleRatio() {
            var nTotalPeople = 100,
                nHappyPeople = 100,
                nFloors = config.nFloors,
                i = 0;
                
            for( i = 0; i < nFloors; i++ ) {
                //nHappyPeople += Building.getHappyPeopleFromFloor( i );
                //nTotalPeople += Building.getPeopleFromFloor( i );
            }
                
            return nHappyPeople*100/nTotalPeople;
        }

        /**
         * Put floor information to the object
         */
        function _putFloorInformation(nFloor, oInformation) {
            _oInformation.floors[nFloor] = oInformation;  
        }
        
        /**
         * Put elevator information to the object
         */
        function _putElevatorInformation(oInformation) {
            _oInformation.elevators[nFloor] = oInformation;  
        }
        
        /**
         * Init subscribes
         * @author Jose Luis Orta
         */
        function _initSubscribes() {
          var nIndexFloor = config.nFloors - 1, nIndexElevator = config.nElevators - 1;
          
          while (nIndexFloor >= 0) {
            oBox.subscribe(_sFloorChannelPrefix + nIndexFloor, 
                          "responseInformation", (function(nIndex){ return function (oData) { _putFloorInformation(nIndex, oData) };}(nIndexFloor)) );
            nIndexFloor--;
          }
          while (nIndexElevator >= 0) {
            var sName = config.aElevatorNames[nIndexElevator];
            oBox.subscribe(_sElevatorChannelPrefix + sName, "responseInformation", (function(sName){ return function (oData) { _putElevatorInformation(sName, oData) }; }(sName)) );
            nIndexElevator--;
          }
        }
        /**
         * It obtains the floor information object and save it.
         *
         * @author Jose Luis Orta
         * @param {Number} nFloor
         */
        function _getFloorInformation(nFloor) {
          oBox.publish(_sFloorChannelPrefix + nFloor, "requestInformation");
        }

        /**
         * It requests information of all modules and save it
         * @author Jose Luis Orta
         */
        function _requestInformation() {
          _getInformation(config.nFloors, _getFloorInformation);
          _getInformation(config.nElevators, _getElevatorInformation);
        }

        /**
         * It setups interval for request information
         * @author Jose Luis Orta
         */
        function _requestInformationSetup() {
          setInterval(_requestInformation, _nIntervalTime);
        }
        
        /**
         * This method publish de information through information channel
         * @autor Jose Luis Orta
         */
        function _publishInformation() {
          oBox.publish("information", "intervalInformation", _oInformation);
        }
        /**
         * It setups inteval for put information object through information channel
         * @author Jose Luis Orta
         */
        function _publishInformationSetup() {
          setInterval(_publishInformation, _nIntervalTime);
        }
        
        /**
         * It requests information to an elevator and save it
         */
        function _getElevatorInformation(nElevator) {
          oBox.publish(_sElevatorChannelPrefix + config.aElevatorNames[nElevator], "requestInformation");
        }
        
                
        /**
         * It executes getInformation for callback
         */
         function _getInformation(nLength, fpCallback) {
          var nIndex = 0;
          for (; nIndex < nLength; nIndex++) {
            fpCallback(nIndex);
          }
         }
        
        /**
         * Init module function
         * @author Jose Luis Orta
         */
        function _init() {
            _initSubscribes();
            _publishInformationSetup();
            _requestInformationSetup();
        }
        return {
            init: _init
        };
    });
}(document, window, Core, Configuration));

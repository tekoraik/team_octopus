/**
 * Autoexecutable function, module InformationDeliverer
 * @author  Jose Luis Orta
 * @param  {Object} win                     Global object (normaly window)
 * @param  {Object} doc                     Document object
 * @param  {Object} Core                    Core
 * @param  {Object} ns                      Namespace object
 * @param  {Object} config                  Configuration object
 * @param  {Object} _undefined_             Undefined value
 */
;(function (win, doc, Core, ns, config, _undefined_) {
    "use strict";

    Core.register("InformationDeliverer", function (oBox) {
        var _init, _initSubscribes,
            _putElevatorInformation, _putFloorInformation,
            _nElevators = config.nElevators || 1,
            _nFloors = config.nFloors || 1,
            _aElevatorNames = config.aElevatorNames || ["A"],
            _oInformation = {}, _sFloorChannelPrefix = "floor-",
            _sElevatorChannelPrefix = "elevator-";
            
        _oInformation.floors = [];
        _oInformation.elevators = [];

       /**
        * Put floor information to the object
        * @author Jose Luis Orta
        */
        _putFloorInformation = function (nFloor, oInformation) {
            _oInformation.floors[nFloor] = oInformation;
        };
        
        /**
         * Put elevator information to the object
         * @author Jose Luis Orta
         */
        _putElevatorInformation = function (nElevator, oInformation) {
            _oInformation.elevators[nElevator] = oInformation;
        };

        /**
         * Init subscribes in channels of floors and elevators
         * @author Jose Luis Orta
         */
        _initSubscribes = function () {
            var nIndexFloor = config.nFloors - 1, nIndexElevator = config.nElevators - 1;

            while (nIndexFloor >= 0) {
                oBox.subscribe(_sFloorChannelPrefix + nIndexFloor,
                    "responseInformation",
                    (function(nIndex){
                        return function (oData) {
                            _putFloorInformation(nIndex, oData);
                        };
                    }(nIndexFloor)));
                nIndexFloor--;
            }

            while (nIndexElevator >= 0) {
                var sName = _aElevatorNames[nIndexElevator];
                oBox.subscribe(_sElevatorChannelPrefix + sName,
                    "responseInformation",
                    (function(nElevator){
                        return function (oData) {
                            _putElevatorInformation(nElevator, oData);
                        };
                    }(nIndexElevator)));
                nIndexElevator--;
              }
        }

        /**
         * This method publish de information through information channel
         * @autor Jose Luis Orta
         */
        function _publishInformation() {
          oBox.publish("information", "intervalInformation", _oInformation);
        }

        /**
         * Init function of module
         * @author Jose Luis Orta
         */
        _init = function () {
            _initSubscribes();
        };
        return {
            init: _init,
            destroy: function () {},
            intervalInformation : _publishInformation
        };
    });
}(window, document, Core, Namespace, Namespace.context.configuration));
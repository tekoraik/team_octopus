var Namespace = Namespace || {};
Namespace.model = Namespace.model || {};
(function (win, doc, Core, ns, model, _und_) {
	"use strict";

	model.Building = (function () {
		// Instance stores a reference to the Singleton
		var _oInstance;
		/** 
		 * Private method that returns a instance of Building
		 */
		function _getInstance () {
			var _oConfig = ns.context.configuration || {},
			_sFloorChannelPrefix = "floor-",
			_sFloorModuleName = "Floor",
			_sElevatorModuleName = "Elevator",
			_sCPUModuleName = "CPU",
			_sElevatorChannelPrefix = "elevator-",
			_sPersonAddEvent = "putPerson",
			_startFloors, _init, _startElevators,
			_startModules, _startPersonGenerator,
			_startCPU;

			_startModules = function (nCount, sModuleName) {
				var nIndex = nCount - 1;
			    while (nIndex >= 0) {
			    	Core.start(sModuleName, sModuleName + nIndex);
			    	nIndex--;
			    }
			}
			_startFloors = function () {
				var nFloors = _oConfig.nFloors || 2;
			    _startModules(nFloors, _sFloorModuleName);
			};

			_startElevators = function () {
				var nElevators = _oConfig.nElevators || 1;
			    _startModules(nElevators, _sElevatorModuleName);
			};

			_startPersonGenerator = function () {
				var oPerson = new model.Person({
					nFloorOrigin : 0,
					nFloorDestination : 1,
					nTimeStart : 0,
					nTimeFinish : 0,
					sPanel : "A"
				});
				Core.Mediator.publish(_sFloorChannelPrefix + 0, _sPersonAddEvent, oPerson)
			};

			_startCPU = function () {
				Core.start(_sCPUModuleName, _sCPUModuleName + 1);
			};

			_init = function () {
				_startFloors();
				_startElevators();
				_startPersonGenerator();
				_startCPU();
			};

		    return {
		    	/**
		    	 * Init function, creates floors and elevators and 
		    	 * generate persons.
		    	 */
			    init : _init
		    };
		};
		return {
		    getInstance: function () {
		      	if ( !_oInstance ) {
		        	_oInstance = _getInstance();
		        }
		        return _oInstance;
		    }
		};
	})();
}(window, document, Core, Namespace, Namespace.model));
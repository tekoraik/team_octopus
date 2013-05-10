;(function (doc, win, core, _undefind_){
	core.register("FloorModule", function(box){
		var aBuilding = [];
		function _fpSubscribe(nFloors){
			var i = 0;
			for(; i < nFloors;  ++i){
				box.subscribe("floor-"+i, "responseAssignedElevator",_fpGetElevator);
				box.subscribe("floor-"+i, "openDoor",_fpOpenDoors);
				box.subscribe("floor-"+i, "putPerson",_fpPutPerson);
			}
		}
		function _fpOpenDoors(oData){
			var sElevator = oData.sElevatorName || "A",
				nFloor = oData.sFloor || 0;
				oPerson = aBuilding[0].fpExtracFromDoorQueue(sElevator);
console.log("Meto gente en el ascensor");
			box.publish("floor-" + nFloor,"addPersonElevator", oPerson);
		}
		function _fpGetElevator(oData){
console.log("ya he picado al ascensor");
			aBuilding[0].fpMoveFromControlPannelToDoorQueue(oData.sElevatorName,oData.sControlPannel)
		}
		function _fpCreateBuild(nFloors, nControlPanels, nElevators){
			var i = 0;
			for(; i < nFloors; ++i){
				aBuilding.push(new Floor());
			}
		}
		function _fpPutPerson(oData){
			aBuilding[0].fpAddPersonToEntranceQueue(oData);
			aBuilding[0].fpMoveFromEntranceToPannelQueue("A");
console.log("Entra una persona al edificio");

		};
		function _init(nFloors, nControlPanels, nElevators){
			var nFloors = nFloors || 1,
				nControlPanels = nControlPanels || 1,
				nElevators = nElevators || 1;
				_fpCreateBuild(nFloors, nControlPanels, nElevators);
				_fpSubscribe(nFloors);
		}
		return{
			init : _init,
			putPerson : _fpPutPerson,
			build : aBuilding
		};
	})
})(document, window, Core);

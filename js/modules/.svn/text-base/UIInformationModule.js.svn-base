;(function (win, doc, _undefined_) {
    "use strict";

    Core.register( "UIInformation", function (oBox) {
        var _oInformationElement,
            _sFloorChannelPrefix;
        
        /**
         * Inicializes DOM vars
         */
        function _initVars () {
          _oInformationElement = doc.getElementById("informationItems");
        }
        
        /**
         * @autor Jose Luis Orta
         */
        function _printInformation (oInformation) {
            var sHTML = "",
                aFloors = oInformation.floors,
                aElevators = oInformation.elevators;

            _oInformationElement.innerHTML = "";
            sHTML += _getHTMLNewInformationSection("Floors", aFloors, _getHTMLOfFloors);
            sHTML += _getHTMLNewInformationSection("Elevators", aElevators, _getHTMLOfElevators);
            _oInformationElement.innerHTML += sHTML;
        }
        
        /**
         * This function return HTML of information of floors information array
         * @author Jose Luis Orta
         * @param {Array} aFloors Array that contains information objects of floors
         * @return {String} HTML with floors information
         */
        function _getHTMLOfFloors (aFloors) {
            var nIndex = 0, nLength = aFloors.length,
                oFloor, sHTML = "";

            for (; nIndex < nLength; nIndex++) {
                oFloor = aFloors[nIndex];
                sHTML += "<h2>Floor " + nIndex + "</h2>";
                sHTML += "<p>People in waiting queue: " + oFloor.oWaitingQueueInformation.nCurrent + "</p>";
                sHTML += "<p>People in queue panel A: " + oFloor.oPanelQueuesInformation["A"].nCurrent + "</p>";
            }
          return sHTML;
        }
        
        /**
         * This function return HTML of information of elevators information array
         * @author Jose Luis Orta
         * @param {Array} aElevators Array that contains information objects of elevators
         * @return {String} HTML with elevators information
         */
        function _getHTMLOfElevators(aElevators) {
            var nIndex = 0, nLength = aElevators.length,
              oElevator, sHTML = "";

            for (; nIndex < nLength; nIndex++) {
                oElevator = aElevators[nIndex];
                sHTML += "<h2>Elevator " + nIndex + "</h2>";
                sHTML += "<p>Current direction: " + oElevator.sCurrentDirection + "</p>";
                sHTML += "<p>Current people: " + oElevator.nCurrentPeople + "</p>";
                sHTML += "<p>Current people: " + oElevator.nTotalPeopleTransported + "</p>";
            }
            return sHTML;
        }
        
        /**
         * This function return HTML with title and wrapping html it is generated to callback
         *
         * @author Jose Luis Orta
         * @param {String} sTitle Title
         * @param {Object} oData Data object to callback
         * @param {Function} Callback
         */
        function _getHTMLNewInformationSection(sTitle, oData, fpInnerHTMLCallback) {
            var sHTML = "";
          
            sHTML += "<section class='information'>";
            sHTML += "<h1>" + sTitle + "</h1>";
            sHTML += fpInnerHTMLCallback(oData);
            sHTML += "</section";
            return sHTML;
        }
        
        /**
         * Init method
         */
        function _init() {
            _initVars();
            oBox.subscribe("information", "intervalInformation", _printInformation);
        }

        return {
            init : _init,
            destroy : function () {}
        };
    });
}(window, document));
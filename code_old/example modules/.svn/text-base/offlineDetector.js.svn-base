;(function (doc, win, $, _undefined_) {
    "use strict";

    /**
     * This module manages the online/offline status detection. It checks if the user is currently
     * online or not. If it's online launches the event "online_status" and if it's offline it
     * launches the event "offline_status". Finally it shows the properly information in the DOM,
     * depending on the launched event.
     * @param  {Object}     box     The Sandbox instance
     */
    Core.register("offlineDetector", function (box) {

        /**
         * This functions is called when the event 'online_status' is triggered and it updates
         * the DOM information to show that the user is online.
         */
        function updateOnlineStatus() {
            var oHTMLCurrentStatus,
                oHTMLStatusError,
                oHTMLUpdateButton;

            oHTMLCurrentStatus = doc.getElementById("current-status");
            oHTMLCurrentStatus.className = "online";
            oHTMLCurrentStatus.innerHTML = "You are online";
            oHTMLStatusError =  doc.getElementById("status-error-message");
            oHTMLStatusError.className = "hidden";
            oHTMLUpdateButton = doc.getElementById("update-button");
            oHTMLUpdateButton.disabled = false;
        }

        /**
         * This functions is called when the event 'offline_status' is triggered and it updates
         * the DOM information to show that the user is offline.
         */
        function updateOfflineStatus() {
            var oHTMLCurrentStatus,
                oHTMLStatusError,
                oHTMLUpdateButton;

            oHTMLCurrentStatus = doc.getElementById("current-status");
            oHTMLCurrentStatus.className = "offline";
            oHTMLCurrentStatus.innerHTML = "You are offline";
            oHTMLStatusError =  doc.getElementById("status-error-message");
            oHTMLStatusError.className = "";
            oHTMLUpdateButton = doc.getElementById("update-button");
            oHTMLUpdateButton.disabled = true;
        }

        /**
         * Adds the online/offline status detection listeners to the web
         */
        function addStatusListeners() {
            doc.body.addEventListener("offline", function () {
                box.publish("online_status", "offline");
            }, false);
            doc.body.addEventListener("online", function () {
                box.publish("online_status", "online");
            }, false);
        }

        /**
         * This function checks the first time the page is loaded if the user was online or not
         */
        function firstStatusCheck() {
            if (win.navigator.onLine) {
                box.publish("online_status", "online");
            } else {
                box.publish("online_status", "offline");
            }
        }
        return {
            init: function () {
                box.subscribe("online_status", "online", updateOnlineStatus);
                box.subscribe("online_status", "offline", updateOfflineStatus);
                $('#update-button').on('click', firstStatusCheck);
                firstStatusCheck();
                addStatusListeners();
            }
        };
    });
}(document, window, jQuery));
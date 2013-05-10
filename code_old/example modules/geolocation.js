;(function (doc, win, _undefined_) {
    "use strict";

    /**
     * This module manages the geolocation. Listen to the event 'online_status' and when this event
     * is triggered it tries to get the current coordinates from where the user is visiting the
     * web page. It can launch either the event 'geolocation_error' or 'geolocation_success'. If
     * it's the last one, it adds the coordinates to the data sent with the event.
     * @param  {Object}     box     The Sandbox instance
     */
    Core.register("geolocation", function (box) {

        /**
         * It's invoked when the invocation of the function getCurrentPosition success. It
         * publishes the event 'geolocation_success' with the coordinates of the location
         * obtained.
         * @param  {Object} oPosition An object with information related to the user situation
         */
        function success(oPosition) {
            box.publish("geolocation_status", "success", {"latitude": oPosition.coords.latitude,
                "longitude": oPosition.coords.longitude});
        }

        /**
         * It's invoked when the invocation of the function getCurrentPosition fails. It
         * publishes the event 'geolocation_error' with the error message.
         * @param  {String} sErrorMessage The error message
         */
        function error(sErrorMessage) {
            var sFinalMessage = typeof sErrorMessage === 'string' ? sErrorMessage : "failed";

            box.publish("geolocation_status", "error", sFinalMessage);
        }

        /**
         * This function is invoked when the event 'geolocation_error' is triggered. It shows
         * the DOM geolocation error message.
         */
        function showGeolocationError() {
            var oHTMLGeolocationErrorMessage;

            oHTMLGeolocationErrorMessage = doc.getElementById("geolocation-error-message");
            oHTMLGeolocationErrorMessage.className = "";
        }

        /**
         * This function is invoked when the event 'geolocation_success' is triggered. It hides
         * the DOM geolocation error message.
         */
        function hiddeGeolocationError() {
            var oHTMLGeolocationErrorMessage;

            oHTMLGeolocationErrorMessage = doc.getElementById("geolocation-error-message");
            oHTMLGeolocationErrorMessage.className = "hidden";
        }

        /**
         * This function is called when the 'online_status' event is triggered and it tries to
         * get the user current location.
         */
        function getCurrentPosition() {
            if (win.navigator.geolocation) {
                win.navigator.geolocation.getCurrentPosition(success, error);
            } else {
                box.publish("geolocation_status", "error", "not supported");
            }
        }
        return {
            init: function (sMessage) {
                console.log("gelocation message: " + sMessage);
                box.subscribe("online_status", "online", getCurrentPosition);
                box.subscribe("geolocation_status", "success", hiddeGeolocationError);
                box.subscribe("geolocation_status", "error", showGeolocationError);
            }
        };
    });
}(document, window));
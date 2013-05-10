/*globals Core, require, define*/
;(function () {
    "use strict";
    /**
     * Core module that contains all the inter-module communication methods
     */
    var coreCommunication = function () {
        var slice = [].slice,
            oHandlers = {};//object containing all the handler functions

        return {

            /**
             * Subscribes a callback function with a concrete context to a event. It pushes an
             * object with the callback and the context to the concrete event array in the channel
             * array of the object oHandlers
             * @param  {String}   sChannel    The channel where the event will be published
             * @param  {Event}   eEvent    The event that the fpCallback function wants to be
             *                              subscribed on
             * @param  {Function} fpCallback The callback function to subscribe to the event
             * @param  {Object}   oContext  An optional context of the callback function
             * @return {Object} this
             */
            subscribe: function (sChannel, eEvent, fpCallback, oContext) {
                oHandlers[sChannel] = oHandlers[sChannel] || [];
                oHandlers[sChannel][eEvent] = oHandlers[sChannel][eEvent] || [];
                oHandlers[sChannel][eEvent].push({ context: oContext, callback: fpCallback });
                return this;
            },

            /**
             * Unsubscribes a callback function from a concrete event in the channel
             * @param  {String} eEvent     The event to unsubscribe
             * @param  {Event} eEvent     The event to unsubscribe
             * @param  {Function} fpCallback The callback function that wants to be unsubscribed
             * @return {Object} this
             */
            unsubscribe: function (sChannel, eEvent, fpCallback) {
                var aEventsList = oHandlers[sChannel] || [],
                    aEventCallbacks = aEventsList[eEvent] || [],
                    nLength = aEventCallbacks.length;

                while (nLength--) {
                    if (aEventCallbacks[nLength].callback === fpCallback) {
                        aEventCallbacks.splice(nLength, 1);
                        break;
                    }
                }
                return this;
            },

            /**
             * Unsubscribes all the callback functions from all the topics
             * @return {Object} this
             */
            unsubscribeAll: function () {
                oHandlers = {};
                return this;
            },

            /**
             * Publishes a event in a concrete channel. It means that runs trough the array of
             * callback functions subscribed to that event in a concrete channel and invokes all
             * of them
             * @param  {String} sChannel The channel where the event will be published
             * @param  {Event} eEvent The event to publish
             * @return {Object} this
             */
            publish: function (sChannel, eEvent) {
                var aEventsList = oHandlers[sChannel] || [],
                    aEventCallbacks = aEventsList[eEvent] || [],
                    nLength = aEventCallbacks.length,
                    args = slice.call(arguments, 2);

                // launch all callbacks included in property 'event'
                // and pass them 'data' parameter
                while (nLength--) {
                    aEventCallbacks[nLength].callback.apply(aEventCallbacks.context, args);
                }
                return this;
            }
        };
    };

    // Expose Core as an AMD module
    if (typeof define === "function" && define.amd) {
        define("Core.Communication", ["Core"], function (core) {
            core.Communication = coreCommunication();
            return core.Communication;
        });
    } else {
        Core.Communication = coreCommunication();
    }
}());
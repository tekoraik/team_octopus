/*globals Core*/
;(function (core) {
    "use strict";
    /**
     * Core module that contains all the inter-module communication methods
     * @author Rafael Yepes
     */
    var coreMediator = function () {
        var oHandlers = {},
            slice = [].slice;
        return {
            subscriptions: oHandlers, //object containing all the handler functions
            /**
             * Subscribes a callback function with a concrete context to a event. It pushes an
             * object with the callback and the context to the concrete event array in the channel
             * object of the object oHandlers
             * @author Rafael Yepes
             * @param  {String} sChannel    The channel where the event will be published
             * @param  {Sting}  sEvent      The event that the fpCallback function wants to be
             *                              subscribed on
             * @param  {Function}   fpCallback  The callback function to subscribe to the event
             * @param  {Object} oContext    An optional context of the callback function
             * @return {Object} this
             */
            subscribe: function (sChannel, sEvent, fpCallback, oContext) {
                this.subscriptions[sChannel] = this.subscriptions[sChannel] || {};
                this.subscriptions[sChannel][sEvent] = this.subscriptions[sChannel][sEvent] || [];
                this.subscriptions[sChannel][sEvent].push({context: oContext,
                    callback: fpCallback});
                return this;
            },
            /**
             * Unsubscribes a callback function from a concrete event in the channel
             * @author Rafael Yepes
             * @param  {String} sChannel   The channel where the callback function will be
             *                             unsubscribed
             * @param  {String} sEvent     The event to unsubscribe
             * @param  {Function}   fpCallback  The callback function that wants to be unsubscribed
             * @return {Object} this
             */
            unsubscribe: function (sChannel, sEvent, fpCallback) {
                var oEventsList = this.subscriptions[sChannel] || {},
                    aEventCallbacks = oEventsList[sEvent] || [],
                    nLength = aEventCallbacks.length;

                while (nLength--) {
                    if (aEventCallbacks[nLength].callback === fpCallback) {
                        aEventCallbacks.splice(nLength, 1);
                        if (aEventCallbacks.length === 0) {
                            delete oEventsList[sEvent];
                        }
                        break;
                    }
                }
                return this;
            },
            /**
             * Publishes a event in a concrete channel. It means that runs trough the array of
             * callback functions subscribed to that event in a concrete channel and invokes all
             * of them
             * @author Rafael Yepes
             * @param  {String} sChannel    The channel where the event will be published
             * @param  {Event}  sEvent  The event to publish
             * @return {Object} this
             */
            publish: function (sChannel, sEvent) {
                var oEventsList = this.subscriptions[sChannel] || {},
                    aEventCallbacks = oEventsList[sEvent] || [],
                    nLength = aEventCallbacks.length,
                    args = slice.call(arguments, 2);
                while (nLength--) {
                    aEventCallbacks[nLength].callback.apply(aEventCallbacks.context, args);
                }
                return this;
            },
            /**
             * Unsubscribes all the callback functions from all the events in all the channels
             * @author Rafael Yepes
             * @return {Object} this
             */
            unsubscribeAll: function () {
                this.subscriptions = {};
                return this;
            }
        };
    };
    core.Mediator = coreMediator();
}(Core));
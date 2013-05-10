var Sandbox = function (core, moduleId) {

    return {
        publish: function () {
            return core.Communication.publish.apply(core.Communication, arguments);
        },
        subscribe: function (sChannel, eEvent, fpCallback, oContext) {
            core.Communication.subscribe(sChannel, eEvent, fpCallback, oContext);
        },
        unsubscribe: function (sChannel, eEvent, fpCallback) {
            core.Communication.unsubscribe(sChannel, sChannel, eEvent, fpCallback);
        },
        unsubscribeAll: function (oContext) {
            core.Communication.unsubscribeAll(oContext);
        }
        // This will be interesting to implement in the future
        /*
        request: function (data) {
            core.Ajax.request(data, moduleId);
        }
        */
    };
};

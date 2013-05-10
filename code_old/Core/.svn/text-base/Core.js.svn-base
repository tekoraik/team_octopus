/*globals Sandbox, define*/
;(function (doc, win, _undefined_) {
    "use strict";

    /**
     * The core of the application. It manages the module lifecycle and enables inter-module
     * communication
     */
    var core = function () {
        var oModules = {},
            slice = [].slice;

        return {

            /**
             * Registers a module in the core. Adds the information of the given module to the inner
             * object oModules that has all the registered modules.
             * @param  {String} sModuleId The id of the module
             * @param  {Function} Creator  The constructor function that returns an instance
             *                             of the module.
             */
            register: function (sModuleId, Creator) {
                oModules[sModuleId] = {
                    creator: Creator,
                    instances: {},
                    args: slice.call(arguments, 2)
                };
            },

            /**
             * Starts the module with id 'sModuleId' if it was previously registered and if it
             * wasn't started before.
             * @param  {String} sModuleId The module identifier
             */
            start: function (sModuleId, sInstanceId) {
                var args = slice.call(arguments, 2);
                
                if (oModules[sModuleId] === undefined) {
                    console.log("error1");
                    return false;
                } else {
                    //we don't want to start the module twice
                    oModules[sModuleId].instances[sInstanceId] = oModules[sModuleId].creator(Sandbox(this, sModuleId));
                    oModules[sModuleId].instances[sInstanceId].init.apply(null, args);
                    return oModules[sModuleId].instances[sInstanceId];
                }   
            },

            /**
             * Stops a registered module with id 'sModuleId' that was previously started.
             * @param  {String} sModuleId The module identifier
             */
            stop: function (sModuleId, sInstanceId) {
                var oInstances = oModules[sModuleId];

                if (oInstances === undefined) {
                    //throw new Error("Attempt to stop a module that has not been registered: " + sModuleId);
                    return false;
                } else if (oInstances.instances) {
                    oInstances.instances[sInstanceId].destroy();
                    oInstances.instances[sInstanceId] = null;
                    return true;
                }
            },

            /**
             * Starts all the registered modules
             */
            /*
            startAll: function () {
                var sModuleId, sInstanceId, oInstances;

                for (sModuleId in oModules) {
                    if (oModules.hasOwnProperty(sModuleId)) {
                        oInstances = oModules[sModuleId];
                        for (sInstanceId in oInstances) {
                            if (oInstances.hasOwnProperty(sInstanceId)) {
                                this.start(sModuleId);
                            }
                        }
                    }
                }
            },
            */

            /**
             * Stops all the started modules
             */
            stopAll: function () {
                var sModuleId;

                for (sModuleId in oModules) {
                    if (oModules.hasOwnProperty(sModuleId)) {
                        this.stop(sModuleId);
                    }
                }
            }
        };
    };

    // Expose Core as an AMD module
    if (typeof define === "function" && define.amd) {
        define("Core", [], function () {
            return core();
        });
    } else {
        win['Core'] = core();
    }
}(document, window));
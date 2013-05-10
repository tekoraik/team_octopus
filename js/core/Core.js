;(function (doc, win, _undefined_) {
    "use strict";
    /**
     * The core of the application. It manages the module life-cycle and enables inter-module
     * communication. The returned object of the execution of this function is stored later in
     * window.Core. The parameter of the returned object are commented below.
     * @author Rafael Yepes
     * @return {Object} The Core object. It has the following methods and properties
     *                      @attribute {Function} register Adds the information of the module
     *                      @attribute {Function} start    Creates a new instance of the module
     *                      @attribute {Function} unregister   Remove all the information of a
     *                                                         module
     *                      @attribute {Function} stop   Destroy an instance of a module
     *                      @attribute {Function} getInstance Returns an stored instance of a module
     *                      @attribute {Object} modules Contains all the information of the modules
     */
    var core = function () {
        var oModules = {},
            slice = [].slice;
        function createInstance(Creator) {
            var oInstance;
            oInstance = Creator(Core.Mediator);
            oInstance.init = oInstance.init || function () {};
            oInstance.onDestroy = oInstance.onDestroy || function () {};
            return oInstance;
        }
        return {
            /**
             * Registers a module in the core. Adds the information of the given module to the
             * object this.modules that has all the registered modules.
             * @author Rafael Yepes
             * @param  {String} sModuleId The id of the module
             * @param  {Function} Creator  The constructor function that returns an instance
             *                             of the module.
             */
            register: function (sModuleId, Creator) {
                this.modules[sModuleId] = {
                    creator: Creator,
                    instances: {}
                };
            },
            /**
             * Starts the module with id 'sModuleId' if it was previously registered with
             * the id sInstanceId
             * @author Rafael Yepes
             * @param  {String} sModuleId   The module identifier
             * @param  {String} sInstanceId The identifier of the new instance
             * @return {Boolean}            Returns if the module could have been instanced
             */
            start: function (sModuleId, sInstanceId) {
                var oModule = this.modules[sModuleId],
                    args = slice.call(arguments, 2);
                if ((oModule !== undefined) && (oModule.toString() === "[object Object]")) {
                    this.modules[sModuleId].instances[sInstanceId] = createInstance(this.modules[sModuleId].creator);
                    this.modules[sModuleId].instances[sInstanceId].init.apply(null, args);
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * Removes the object that represents the module 'sModuleId' from the list of the
             * registered modules
             * @author Rafael Yepes
             * @param  {String} sModuleId   The identifier of the module that is going to be
             *                              unregistered
             */
            unregister: function (sModuleId) {
                delete this.modules[sModuleId];
            },
            /**
             * This method stops a concrete instance of an started module by first calling the
             * method 'onDestroy' of that instance and then removing the
             * @author Rafael Yepes
             * @param  {String} sModuleId   The module identifier
             * @param  {String} sInstanceId The identifier of the instance that is going to be
             *                              stopped
             * @return {Boolean}            Returns if the instance was stopped or not
             */
            stop: function (sModuleId, sInstanceId) {
                var oModule = this.modules[sModuleId],
                    oInstances, oCurrentInstance,
                    args = slice.call(arguments, 2);
                if ((oModule !== undefined) && (oModule.toString() === "[object Object]")) {
                    oInstances = oModule.instances;
                    oCurrentInstance = oInstances[sInstanceId];
                    if ((oCurrentInstance !== undefined) &&
                        (oCurrentInstance.toString() === "[object Object]")) {
                        oCurrentInstance.onDestroy.apply(null, args);
                        delete oInstances[sInstanceId];
                        return true;
                    }
                }
                return false;
            },
            /**
             * Returns the instance previously named 'sInstanceId' of the module 'sModuleId'
             * @author Rafael Yepes
             * @param  {String} sModuleId   The module identifier
             * @param  {String} sInstanceId The identifier of the instance that is going to be
             *                              returned
             * @return {Object}             The concrete instance of the module that was started
             *                              before. Undefined is returned if fails
             */
            getInstance: function (sModuleId, sInstanceId) {
                var oModule = this.modules[sModuleId],
                    oInstances, oCurrentInstance;
                if ((oModule !== undefined) && (oModule.toString() === "[object Object]")) {
                    oInstances = oModule.instances;
                    oCurrentInstance = oInstances[sInstanceId];
                    if ((oCurrentInstance !== undefined) &&
                        (oCurrentInstance.toString() === "[object Object]")) {
                        return oCurrentInstance;
                    }
                }
            },
            modules: oModules
        };
    };
    win['Core'] = core();
}(document, window));
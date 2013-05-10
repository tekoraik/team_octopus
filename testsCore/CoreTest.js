/**
 * @author Rafael Yepes
 */
;(function(win, doc, core) {
    TestCase("coreTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that core exists" : function () {
            assertNotUndefined(core);
        },
        "test that core is an object" : function () {
            var sObjectType = core.toString();
            assertEquals("[object Object]", sObjectType);
        }
    });
    TestCase("coreModulesTest", {
        "test that core.modules exists" : function () {
            assertNotUndefined(core.modules);
        },
        "test that core.modules is an object" : function () {
            var sObjectType = core.modules.toString();
            assertEquals("[object Object]", sObjectType);
        }
    });
    TestCase("coreRegisterTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that core has the method register": function () {
            assertNotUndefined(core.register);
            assertFunction(core.register);
        },
        "test that invoking the method core.register, when invoked with first parameter as string,\
        it adds a new object as property 'the value of the string' to the object core.modules":
        function () {
            core.register(this.sMyModule);
            assertNotUndefined(core.modules[this.sMyModule]);
            assertEquals("[object Object]", core.modules[this.sMyModule]);
        },
        "test that invoking core.register twice, adds 2 objects to core.modules": function () {
            core.register(this.sModule1);
            core.register(this.sModule2);
            assertNotUndefined(core.modules[this.sModule1]);
            assertNotUndefined(core.modules[this.sModule2]);
        },
        "test that the object added to core.modules has the method 'creator'": function () {
            core.register(this.sModule);
            assert(core.modules[this.sModule].hasOwnProperty("creator"));
        },
        "test that when invoking register using as second parameter a function, the function is\
        assigned to the method 'creator' of the new object added to core.modules" : function () {
            var myFunction, notMyFunction, myCreatorFunction;
            myFunction = function () {
                return "I'm your function";
            };
            notMyFunction = function () {
                return "I'm not your function";
            };
            assertNotEquals(myFunction, notMyFunction);
            core.register(this.sModule, myFunction);
            myCreatorFunction = core.modules[this.sModule].creator;
            assertEquals(myFunction, myCreatorFunction);
            assertNotEquals(notMyFunction, myCreatorFunction);
        },
        "test that when registering a module to core.modules, the object added has also a property\
        'instances'" : function () {
            core.register(this.sModule);
            assert(core.modules[this.sModule].hasOwnProperty("instances"));
        }
    });
    TestCase("coreUnregisterTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that core has the method unregister" : function () {
            assertNotUndefined(core.unregister);
            assertFunction(core.unregister);
        },
        "test that invoking the method core.unregister, when invoked with first parameter as\
        string, it deletes the property 'the value of the string' from the object core.modules":
        function () {
            core.modules[this.sMyModule] = {};
            assertNotUndefined(core.modules[this.sMyModule]);
            core.unregister(this.sMyModule);
            assertUndefined(core.modules[this.sMyModule]);
        },
        "test that unregistering a module that doesn't exist, don't effect other registered modules"
        : function () {
            core.modules[this.sModule1] = {};
            assertNotUndefined(core.modules[this.sModule1]);
            assertUndefined(core.modules[this.sModule2]);
            core.unregister(this.sModule2);
            assertNotUndefined(core.modules[this.sModule1]);
            assertUndefined(core.modules[this.sModule2]);
        }
    });
    TestCase("coreStartTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
            this.oConstructedObject = {
                sProperty: "I'm a property",
                fpMethod: function () {
                    return "I'm a method";
                }
            };
            this.fpMyModuleCreator = sinon.stub().returns(this.oConstructedObject);
            core.modules[this.sMyModule] = {
                creator: this.fpMyModuleCreator,
                instances: {}
            };
            this.sMyInstance = "myInstance";
            this.sInstance1 = "myFirstInstance";
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that core has the method start" : function () {
            assertNotUndefined(core.start);
            assertFunction(core.start);
        },
        "test that when invoking the method core.start passing as first argument the module id, the\
        method 'creator' of that module will be invoked": function () {
            core.start(this.sMyModule);
            assertTrue(this.fpMyModuleCreator.called);
        },
        "test that starting an existing module returns true" : function () {
            assert(core.start(this.sMyModule));
        },
        "test that invoking the method core.start of a module that doesn't exist returns false":
        function () {
            assertFalse(core.start(this.sMyModule2));
        },
        "test that when starting a module, the second parameter is the name of the instance that\
        will added into the property 'instances' of the module": function() {
            core.start(this.sMyModule, this.sMyInstance);
            assert(core.modules[this.sMyModule].instances.hasOwnProperty(this.sMyInstance));
        },
        "test that when starting a module, the value of the property 'instance id' of the property\
        'instances' of the current module is the returned value of the execution of the method\
        'creator' of the current module" : function () {
            core.start(this.sMyModule, this.sMyInstance);
            assertEquals(this.oConstructedObject,
                core.modules[this.sMyModule].instances[this.sMyInstance]);
        },
        /* I couldn't check it out
        "test that when starting a module, the creator method of the module is called with\
        core.Mediator as first argument": function () {
            assertFalse(core.modules[this.sMyModule].creator.called);
            core.modules[this.sMyModule].creator.withArgs(core.Mediator);
            assertNotUndefined(core.Mediator);
            //this.fpMyModuleCreator.withArgs(core.Mediator);
            core.start(this.sMyModule, this.sMyInstance);
            
            //var spyCall =  core.modules[this.sMyModule].creator.getCall(0);

            //assertEquals("/stuffs", spyCall.args[0]);
            assertEquals(core.Mediator, this.fpMyModuleCreator.getCall(0).args[0]);
            //assert(this.fpMyModuleCreator.withArgs(core.Mediator).calledOnce);
        },
        */
       "test that all the created instances by starting a module have the method 'init' and the\
       method 'onDestroy'":
       function () {
            var oMyInstance;
            core.start(this.sMyModule, this.sMyInstance);
            oMyInstance = core.modules[this.sMyModule].instances[this.sMyInstance];
            assertNotUndefined(oMyInstance);
            assertNotUndefined(oMyInstance.init);
            assertFunction(oMyInstance.init);
            assertNotUndefined(oMyInstance.onDestroy);
            assertFunction(oMyInstance.onDestroy);
        },
        "test that when starting a module, the method 'init' of the new instance of the module is\
        called, using as arguments, the extra arguments used  in core.start": function () {
            var oExample,
                fpConstructor,
                sModuleName,
                sInstanceName, sAnotherInstanceName, sThirdInstanceName,
                sFirstArgument, sSecondArgument,
                spy, spyCall;
            oExample = { init: function () {} };
            spy = sinon.spy(oExample, "init");
            fpConstructor = sinon.stub().returns(oExample);
            sModuleName = "Testing Module";
            sInstanceName = "Some instance";
            core.modules[sModuleName] = {
                creator: fpConstructor,
                instances: {}
            };
            sFirstArgument = "the first";
            sSecondArgument = "the second";
            core.start(sModuleName, sInstanceName);
            assert(spy.withArgs().calledOnce);
            sAnotherInstanceName = "Other instance";
            core.start(sModuleName, sAnotherInstanceName, sFirstArgument);
            assert(spy.calledTwice);
            assert(spy.withArgs(sFirstArgument).calledOnce);
            sThirdInstanceName = "instance 3";
            core.start(sModuleName, sThirdInstanceName, sFirstArgument, sSecondArgument);
            assert(spy.withArgs(sFirstArgument, sSecondArgument).calledOnce);
        }
    });
    TestCase("coreStopTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
            this.oConstructedObject = {
                sProperty: "I'm a property",
                fpMethod: function () {
                    return "I'm a method";
                },
                init: function() {},
                onDestroy: function() {}
            };
            this.sMyInstance = "myInstance";
            this.sInstance1 = "myFirstInstance";
            this.fpMyModuleCreator = sinon.stub().returns(this.oConstructedObject);
            core.modules[this.sMyModule] = {
                creator: this.fpMyModuleCreator,
                instances: {
                    "myInstance": this.oConstructedObject
                }
            };
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that the method core.stop exists": function() {
            assertNotUndefined(core.stop);
            assertFunction(core.stop);
        },
        "test that when calling core.stop with arguments 'sModuleId' and 'sInstanceId', the\
        instance 'sInstanceId' of the module 'sModuleId' is deleted and the function core.stop\
        returns true": function() {
            var sModuleId, sInstanceId,
                oInstances,
                bStopped;
            sModuleId = this.sMyModule;
            sInstanceId = this.sMyInstance;
            oInstances = core.modules[this.sMyModule].instances;
            assertNotUndefined(oInstances[this.sMyInstance]);
            bStopped = core.stop(sModuleId, sInstanceId);
            assert(bStopped);
            assertUndefined(oInstances[this.sMyInstance]);
        },
        "test that stopping a instance that doesn't exist returns false": function() {
            assertFalse(core.stop("not a module", "not an instance"));
            assertFalse(core.stop(this.sMyModule, "not an instance"));
        },
        "test that when stopping an instance of a module, the method 'onDestroy' of that instance\
        is called": function() {
            var oInstance,
                fpModuleCreator,
                sModuleName, sInstanceName,
                bStopped,
                spy;
            oInstance = {
                init: function() {},
                onDestroy: function() {}
            };
            fpModuleCreator = sinon.stub().returns(oInstance);
            sModuleName = "myTestingModule";
            sInstanceName = "myInstance";
            core.modules[sModuleName] = {
                creator: fpModuleCreator,
                instances: {
                    "myInstance": oInstance
                }
            };
            spy = sinon.spy(oInstance, "onDestroy");
            assertFalse(spy.called);
            assertNotUndefined(core.modules[sModuleName]);
            assertNotUndefined(core.modules[sModuleName].instances);
            assertNotUndefined(core.modules[sModuleName].instances[sInstanceName]);
            assertNotUndefined(core.modules[sModuleName].instances[sInstanceName].onDestroy);
            bStopped = core.stop(sModuleName, sInstanceName);
            assert(bStopped);
            assert(spy.called);
        }
    });
    TestCase("coreGetInstanceTest", {
        setUp: function () {
            this.sMyModule = "myModule";
            this.sModule1 = "myFirstModule";
            this.sModule2 = "mySecondModule";
            this.oConstructedObject = {
                sProperty: "I'm a property",
                fpMethod: function () {
                    return "I'm a method";
                },
                init: function() {},
                onDestroy: function() {}
            };
            this.sMyInstance = "myInstance";
            this.sInstance1 = "myFirstInstance";
            this.fpMyModuleCreator = sinon.stub().returns(this.oConstructedObject);
            core.modules[this.sMyModule] = {
                creator: this.fpMyModuleCreator,
                instances: {
                    "myInstance": this.oConstructedObject
                }
            };
        },
        tearDown: function () {
            core.modules = {};
        },
        "test that the method core.getInstance exists": function() {
            assertNotUndefined(core.getInstance);
            assertFunction(core.getInstance);
        },
        "test that when calling core.getInstance with arguments 'sModuleId' and 'sInstanceId', the\
        instance 'sInstanceId' of the module 'sModuleId' is returned": function() {
            var sModuleId, sInstanceId,
                oInstances,
                bStopped,
                oInstance;
            sModuleId = this.sMyModule;
            sInstanceId = this.sMyInstance;
            oInstances = core.modules[this.sMyModule].instances;
            assertNotUndefined(oInstances[this.sMyInstance]);
            oInstance = core.getInstance(sModuleId, sInstanceId);
            assertEquals(oInstance, this.oConstructedObject);
        },
        "test that stopping a instance that doesn't exist returns false": function() {
            assertFalse(core.stop("not a module", "not an instance"));
            assertFalse(core.stop(this.sMyModule, "not an instance"));
        },
        "test that when stopping an instance of a module, the method 'onDestroy' of that instance\
        is called": function() {
            var oInstance,
                fpModuleCreator,
                sModuleName, sInstanceName,
                bStopped,
                spy;
            oInstance = {
                init: function() {},
                onDestroy: function() {}
            };
            fpModuleCreator = sinon.stub().returns(oInstance);
            sModuleName = "myTestingModule";
            sInstanceName = "myInstance";
            core.modules[sModuleName] = {
                creator: fpModuleCreator,
                instances: {
                    "myInstance": oInstance
                }
            };
            spy = sinon.spy(oInstance, "onDestroy");
            assertFalse(spy.called);
            assertNotUndefined(core.modules[sModuleName]);
            assertNotUndefined(core.modules[sModuleName].instances);
            assertNotUndefined(core.modules[sModuleName].instances[sInstanceName]);
            assertNotUndefined(core.modules[sModuleName].instances[sInstanceName].onDestroy);
            bStopped = core.stop(sModuleName, sInstanceName);
            assert(bStopped);
            assert(spy.called);
        }
    });
})(window, document, Core);
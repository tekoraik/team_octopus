(function (win, doc, Core, ns, und) {
    "use strict";

    function commonSetUp() {
        this.sModuleName = "InformationDeliverer";
        this.aModuleInstances = ["informationDeliverer1"];
        if (typeof Core.Mediator.publish.restore === "function") {
            Core.Mediator.publish.restore();
        }
        if (typeof Core.Mediator.subscribe.restore === "function") {
            Core.Mediator.subscribe.restore();
        }
        this.oSpyPublish = sinon.spy(Core.Mediator, "publish");
        this.oSpySubscribe = sinon.spy(Core.Mediator, "subscribe");
        Core.start(this.sModuleName, this.aModuleInstances[0]);
        this.oModule = Core.getInstance(this.sModuleName, this.aModuleInstances[0]);
        this.sFloorPrefix = "floor-";
        this.sElevatorPrefix = "elevator-";
    }

    function commonTearDown() {
        Core.stop(this.sModuleName, this.aModuleInstances[0]);
        Core.Mediator.publish.restore();
        Core.Mediator.subscribe.restore();
    }

    TestCase("InformationDeliverer Module", sinon.testCase({
        setUp : function () {
            commonSetUp.call(this);
        },
        tearDown : function () {
            commonTearDown.call(this);
        },
        "test proper init behaviour" : function () {
            assertTrue(this.oSpySubscribe.withArgs(this.sFloorPrefix + "0", "responseInformation").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(this.sElevatorPrefix + "A", "responseInformation").calledOnce);
        },
        "test proper publishing information" : function () {
            var oExpected = { floors : [], elevators : [] },
                oCall;
            this.oModule.intervalInformation();
            oCall = this.oSpyPublish.withArgs("information", "intervalInformation");
            assertTrue(oCall.calledOnce);
            assertEquals(oExpected, oCall.args[0][2]);
        },
        "test proper collection of information" : function () {
            var oInformationExpected = {},
                oExpected = { 
                    floors : [
                        oInformationExpected,
                        oInformationExpected
                    ],
                    elevators: [
                        oInformationExpected
                    ],
                }, oCall;

            Core.Mediator.publish(this.sFloorPrefix + "0", "responseInformation", oInformationExpected);
            Core.Mediator.publish(this.sFloorPrefix + "1", "responseInformation", oInformationExpected);
            Core.Mediator.publish(this.sElevatorPrefix + "A", "responseInformation", oInformationExpected);
            this.oModule.intervalInformation();
            oCall = this.oSpyPublish.withArgs("information", "intervalInformation");
            assertTrue(oCall.calledOnce);
            assertEquals(oExpected, oCall.args[0][2]);
        }
    }));
}(window, document, Core, Namespace));
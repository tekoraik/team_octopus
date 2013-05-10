(function (win, doc, Core, ns, und) {
    "use strict";

    function commonSetUp() {
        ns.model.Person = sinon.stub().returns({});
        this.oConfig = ns.context.configuration;
        this.sFloorChannelPrefix = "floor-";
        this.sElevatorChannelPrefix = "elevator-";
        this.sFloorModuleName = "Floor";
        this.sElevatorModuleName = "Elevator";
        this.sCPUModuleName = "CPU";
        this.oBuilding = ns.model.Building.getInstance();
        if (typeof Core.Mediator.publish.restore === "function") {
            Core.Mediator.publish.restore();
        }
        if (typeof Core.Mediator.subscribe.restore === "function") {
            Core.Mediator.subscribe.restore();
        }

        this.oSpyPublish = sinon.spy(Core.Mediator, "publish");
        this.oSpySubscribe = sinon.spy(Core.Mediator, "subscribe");
    }

    function commonTearDown() {
        Core.Mediator.publish.restore();
        Core.Mediator.subscribe.restore();

    }

    TestCase("Building init", sinon.testCase({
        setUp : function () {
            commonSetUp.call(this);
            if (typeof Core.start.restore === "function") {
                Core.start.restore();
            }
            this.oStubStart = sinon.stub(Core, "start");
        },
        tearDown : function () {
            commonTearDown.call(this);
            Core.start.restore();
        },
        "test proper init behaviour" : function () {
            var nIndex;
            this.oBuilding.init();
            nIndex = this.oConfig.nFloors - 1;
            while (nIndex >= 0) {
                assertTrue(this.oStubStart.withArgs(this.sFloorModuleName, 
                    this.sFloorModuleName + (nIndex + "")).calledOnce);
                nIndex--;
            }
            nIndex = this.oConfig.nElevators - 1;
            while (nIndex >= 0) {
                assertTrue(this.oStubStart.withArgs(this.sElevatorModuleName, 
                    this.sElevatorModuleName + (nIndex + "")).calledOnce);
                nIndex--;
            }
            assertTrue(this.oStubStart.withArgs(this.sCPUModuleName).calledOnce);
            assertTrue(this.oSpyPublish.withArgs("floor-0", "putPerson").calledOnce);
        }
    }));
}(window, document, Core, Namespace));
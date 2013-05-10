(function (win, doc, Core, ns, und) {
    "use strict";
    /**
     * Setup function needed to module tests
     */
    function commonSetUp() {
        /*:DOC +=
        <article id="systemInformation">
            <header>
                <h1>System information</h1>
            </header>
            <div id="informationItems"></div>
        </article>
        */
        this.sModuleName = "UIInformation";
        this.aModuleInstances = ["uiInformation1"];
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
        this.sChannel = "information";
        this.sIntervalInformationEvent = "intervalInformation";
        this.oInformationElement = doc.getElementById("informationItems");
    }

    /**
     * Restore the original state it was before the test
     */
    function commonTearDown() {
        Core.stop(this.sModuleName, this.aModuleInstances[0]);
        Core.Mediator.publish.restore();
        Core.Mediator.subscribe.restore();
        Core.Mediator.unsubscribeAll();
    }

    TestCase("UiInformation Module", sinon.testCase({
        setUp : function () {
            commonSetUp.call(this);
        },
        tearDown : function () {
            commonTearDown.call(this);
        },
        "test proper init behaviour" : function () {
            assertTrue(this.oSpySubscribe.withArgs(this.sChannel, this.sIntervalInformationEvent).calledOnce);
        },
        "test proper data populate" : function () {
            //Information for deliverer in test
            var oInformation = {
                floors : [
                    {
                        oWaitingQueueInformation : {
                            nCurrent : Math.floor(Math.random() * 10),
                        },
                        oPanelQueuesInformation : {
                            A : { 
                                nCurrent : Math.floor(Math.random() * 10),
                                nTotal : Math.floor(Math.random() * 10),
                            },
                            B : {
                                nCurrent : Math.floor(Math.random() * 10),
                                nTotal : Math.floor(Math.random() * 10),
                            }
                        },
                        oElevatorQueuesInformation : {
                            A : { 
                                nCurrent : Math.floor(Math.random() * 10),
                                nTotal : Math.floor(Math.random() * 10),
                            },
                            B : {
                                nCurrent : Math.floor(Math.random() * 10),
                                nTotal : Math.floor(Math.random() * 10),
                            }
                        }
                    }
                ],
                elevators : [
                    {
                        A : {
                            nTotalTraveledFloors : Math.floor(Math.random() * 10),
                            sCurrentDirection : "up",
                            nCurrentPeople : Math.floor(Math.random() * 10),
                            nTotalPeopleTransported : Math.floor(Math.random() * 10),
                            nCurrentWeight : Math.floor(Math.random() * 10)
                        },
                        B : {
                            nTotalTraveledFloors : Math.floor(Math.random() * 10),
                            sCurrentDirection : "up",
                            nCurrentPeople : Math.floor(Math.random() * 10),
                            nTotalPeopleTransported : Math.floor(Math.random() * 10),
                            nCurrentWeight : Math.floor(Math.random() * 10)
                        }
                    }
                ]
            };
            //First time, the information DOM element should be empty
            assertTrue(this.oInformationElement.innerHTML.length === 0);
            Core.Mediator.publish(this.sChannel, 
                this.sIntervalInformationEvent,
                oInformation
            );
            //UIInformation module should be filled information DOM element
            assertTrue(this.oInformationElement.innerHTML.length > 0);
        }
    }));
}(window, document, Core, Namespace));
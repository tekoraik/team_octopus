/**
 * Test class Elevator
 * @author Regino Ballester
 */
(function (win, doc, Core, undefined) {
    "use strict";

    function commonSetUp() {
        this.sModuleName = "elevator";
        this.aModuleInstances = ["elevator1"];
        this.oSpyPublish = sinon.spy( Core.Mediator, "publish" );
        this.oSpySubscribe = sinon.spy( Core.Mediator, "subscribe" );
        Core.start( this.sModuleName, this.aModuleInstances[0], "A", 5, 1 );
        this.oModule = Core.getInstance( this.sModuleName, this.aModuleInstances[0] );
        this.sFloorPrefix = "floor-";
        this.sElevatorPrefix = "elevator-";
    }

    function commonTearDown() {
        Core.stop(this.sModuleName, this.aModuleInstances[0]);
        Core.Mediator.publish.restore();
        Core.Mediator.subscribe.restore();
    }

    TestCase("Elevator Module", sinon.testCase({
        setUp : function () {
            commonSetUp.call(this);
        },
        tearDown : function () {
            commonTearDown.call(this);
        },
        "test proper init behaviour" : function () {
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sElevatorPrefix + "A", "addStopFloor").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sElevatorPrefix + "A", "continue").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sElevatorPrefix + "A", "reset").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sFloorPrefix + "1", "addPersonElevator").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sElevatorPrefix + "A", "doorIsOpen").calledOnce);
            assertTrue(this.oSpySubscribe.withArgs(
            	this.sElevatorPrefix + "A", "requestInformation").calledOnce);
        },
        "test if publish that elevator has reached its maximum weight" : function () {
        	var oPerson = {nWeight : 540, nDestinationFloor : 4};

        	Core.Mediator.publish( this.sFloorPrefix + "1", "addPersonElevator", oPerson);
        	assertTrue(this.oSpyPublish.withArgs(this.sFloorPrefix + "1", "execededWeight", oPerson).calledOnce)
        },
        "test if publish that people exits to elevator in correct destination" : function () {
        	var oPerson = {nWeight : 70, nDestinationFloor : 1};
        	
        	Core.Mediator.publish( this.sFloorPrefix + "1", "addPersonElevator", oPerson);
        	Core.Mediator.publish( this.sElevatorPrefix + "A", "doorIsOpen" );
        	assertTrue(this.oSpyPublish.withArgs(this.sFloorPrefix + "1", "readyToAddPeople",
        		{sElevatorName : "A", aDownPeople: [oPerson]}).calledOnce)
        	assertFalse(this.oSpyPublish.withArgs(this.sFloorPrefix + "1", "readyToAddPeople", 
        		{sElevatorName : "A", aDownPeople: []}).calledOnce)
        	assertFalse(this.oSpyPublish.withArgs(this.sFloorPrefix + "1", "readyToAddPeople", 
        		{sElevatorName : "B", aDownPeople: [oPerson]}).calledOnce)
        	assertFalse(this.oSpyPublish.withArgs(this.sFloorPrefix + "0", "readyToAddPeople", 
        		{sElevatorName : "A", aDownPeople: [oPerson]}).calledOnce)
        },
        "test if publish that elevator stay in a sttoped floor " : function () {
            var oPerson = {nWeight : 70, nDestinationFloor : 1};
            
            Core.Mediator.publish( this.sFloorPrefix + "1", "addPersonElevator", oPerson);
        	Core.Mediator.publish( this.sElevatorPrefix + "A", "addStopFloor", 1);
            Core.Mediator.publish( this.sElevatorPrefix + "A", "continue");
        	assertTrue(this.oSpyPublish.withArgs(this.sElevatorPrefix + "A", "inFloor",
        		{nFloor : 1, sDirection : "up"}).calledOnce)
            assertTrue(this.oSpyPublish.withArgs(this.sElevatorPrefix + "A", "stoppedInFloor",
                {nFloor : 1,
                 sDirection : "up",
                 bFinished: false}).calledOnce);
        },
        "test if publish reset elevator add a stop in 0" : function () {
            Core.Mediator.publish( this.sElevatorPrefix + "A", "reset", 0);
            Core.Mediator.publish( this.sElevatorPrefix + "A", "continue");     
            Core.Mediator.publish( this.sElevatorPrefix + "A", "requestInformation");    
            
            assertTrue(this.oSpyPublish.withArgs(this.sElevatorPrefix + "A", "responseInformation", 
                { sName : "A",
                  bFinished : false,
                  aPendingStops : [0], 
                  nCurrentWeight : 0,
                  nCurrentDirection : "down",
                  nCurrentFloor : 0,
                  nCurrentPeople : 0,
                  nTotalTraveledFloors : 1,
                  nTotalPeopleTransported : 0
            }).calledOnce);

        },
        "test if publish  all information is published a stop" : function () {
        	var oPerson = {nWeight : 80, nDestinationFloor : 0};
        	
        	Core.Mediator.publish( this.sFloorPrefix + "1", "addPersonElevator", oPerson);
        	Core.Mediator.publish( this.sElevatorPrefix + "A", "addStopFloor", 0);
        	Core.Mediator.publish( this.sElevatorPrefix + "A", "continue");   	
        	Core.Mediator.publish( this.sElevatorPrefix + "A", "requestInformation");    
        	
        	assertTrue(this.oSpyPublish.withArgs(this.sElevatorPrefix + "A", "responseInformation", 
        		{ sName : "A",
                  bFinished : false,
                  aPendingStops : [0], 
                  nCurrentWeight : 80,
                  nCurrentDirection : "down",
                  nCurrentFloor : 0,
                  nCurrentPeople : 1,
                  nTotalTraveledFloors : 1,
                  nTotalPeopleTransported : 1
            }).calledOnce);
        }        
    }));
}(window, document, Core));

(function(win, doc, Core, _undefined_){
	function commonSetUp() {
        this.sModuleName = "FloorModule";
        this.aModuleInstances = ["building"];
        this.oSpyPublish = sinon.spy( Core.Mediator, "publish" );
        this.oSpySubscribe = sinon.spy( Core.Mediator, "subscribe" );
        Core.start( this.sModuleName, this.aModuleInstances[0],1, 1 );
        this.oModule = Core.getInstance( this.sModuleName, this.aModuleInstances[0]);
        this.sFloorPrefix = "floor-";
        this.sElevatorPrefix = "elevator-";
    }

    function commonTearDown() {
        Core.stop(this.sModuleName, this.aModuleInstances[0]);
        Core.Mediator.publish.restore();
        Core.Mediator.subscribe.restore();
        Core.Mediator.unsubscribeAll()
    }
TestCase("this test is for check the subscriptions",{

	setUp : function(){
         commonSetUp.call(this);
	},
	tearDown : function(){
		commonTearDown.call(this);
		//Core.Mediator.unsubscribeAll()
	},
	"test this test check if the module create a floor" : function(){
        assertTrue(this.oSpySubscribe.withArgs(this.sFloorPrefix + "0", "responseAssignedElevator").calledOnce);		
        assertTrue(this.oSpySubscribe.withArgs(this.sFloorPrefix + "0", "openDoor").calledOnce);
		assertTrue(this.oSpySubscribe.withArgs(this.sFloorPrefix + "0", "putPerson").calledOnce);
	}
});
TestCase("this test check if the build is create",{
	setUp : function(){
         commonSetUp.call(this);
         this.aBuild = [];
         this.aBuild.push(new Floor() )
	},
	tearDown : function(){
		commonTearDown.call(this);
		//Core.Mediator.unsubscribeAll()
	},
	"test this is for create the build" : function(){
console.log(this.oModule);
		assertEquals(this.aBuild, this.oModule.build);
	}	
});

TestCase("this test is for check if can get elevator",{
	setUp : function(){
         commonSetUp.call(this);	

         this.oRequest = {sElevatorName : "A", sControlPannel : "A"};
	},
	tearDown : function(){
		commonTearDown.call(this);
	},
	"test this test check if can get elevator" : function(){
		Core.Mediator.publish("floor-0", "responseAssignedElevator",this.oRequest);
        assertTrue(this.oSpyPublish.withArgs("floor-0", "responseAssignedElevator",this.oRequest).calledOnce);
	}
});

TestCase("this test is for check if can put person",{
	setUp : function(){
        commonSetUp.call(this);	
        this.oElevatorDoor = {sElevatorName : "A"};
        this.oPerson = {"id" : 1};
        this.oRequest = {sElevatorName : "A", sControlPannel : "A"};
	},
	tearDown : function(){
		commonTearDown.call(this);
	},
	"test this test check if can put person" : function(){
		assertEquals(0, this.oModule.build[0].oEntranceQueue.length());
		Core.Mediator.publish("floor-0", "putPerson", this.oPerson);
		assertTrue(this.oSpyPublish.withArgs("floor-0", "putPerson",this.oPerson).calledOnce);
		assertEquals(0, this.oModule.build[0].oEntranceQueue.length());
		assertEquals(1, this.oModule.build[0].oControlPannel["A"].length());
	},
	"test in this test check put one person and get a elevator" : function(){
		assertEquals(0, this.oModule.build[0].oEntranceQueue.length());
		Core.Mediator.publish("floor-0", "putPerson", this.oPerson);
		assertTrue(this.oSpyPublish.withArgs("floor-0", "putPerson",this.oPerson).calledOnce);
		assertEquals(0, this.oModule.build[0].oEntranceQueue.length());		
		Core.Mediator.publish("floor-0", "responseAssignedElevator",this.oRequest);
		assertTrue(this.oSpyPublish.withArgs("floor-0", "responseAssignedElevator",this.oRequest).calledOnce);
		assertEquals(0, this.oModule.build[0].oEntranceQueue.length());	
		assertEquals(0, this.oModule.build[0].oControlPannel["A"].length());
		assertEquals(1, this.oModule.build[0].oDoorQueue["A"].length());

	},
	"test for check if one person can arrive to elevator" : function(){
		Core.Mediator.publish("floor-0", "putPerson", this.oPerson);
		Core.Mediator.publish("floor-0", "responseAssignedElevator",this.oRequest);
		assertEquals(1, this.oModule.build[0].oDoorQueue["A"].length());
		Core.Mediator.publish("floor-0", "openDoor",this.oElevatorDoor);
		assertEquals(0, this.oModule.build[0].oDoorQueue["A"].length());
		assertTrue(this.oSpyPublish.withArgs("floor-0", "addPersonElevator").calledOnce);


	}

});
})(window, document, Core);


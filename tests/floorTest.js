function commonSetUp(nDoors, nPannels){
		this.oFloor = new Floor(nDoors, nPannels);
}
function commonTearDown(){

}
TestCase("Test for comprove if can create instance of floor",{
	setUp : function() {
		this.oFloor = new Floor();
	},
	tearDown : function() {

	},
	"test for comprove" : function() {
		assertNotUndefined(this.oFloor);
		assertObject(this.oFloor.oEntranceQueue);
		assertObject(this.oFloor.oDoorQueue);
		assertObject(this.oFloor.oControlPannel);
	}
})

TestCase("Test for comprove if can create a instance with params",{
	setUp : function() {
		this.oFloor = new Floor(2, 2);

	},
	tearDown : function() {

	},
	"test for comprove" : function() {

		assertNotUndefined(this.oFloor);
		assertNotUndefined(this.oFloor.oEntranceQueue);
		assertObject(this.oFloor.oEntranceQueue);
		assertObject(this.oFloor.oDoorQueue);
		assertObject(this.oFloor.oControlPannel);
		assertObject(this.oFloor.oControlPannel["A"]);
		assertObject(this.oFloor.oControlPannel["B"]);
		assertObject(this.oFloor.oDoorQueue["A"]);
		assertObject(this.oFloor.oDoorQueue["B"]);
	}
})

TestCase("Test for comprove if They can move one person from control pannel to door queue and comprove the function length",{
	setUp : function() {
		this.oFloor = new Floor(2, 2);

	},
	tearDown : function() {

	},
	"test for add two person" : function() {
		assertNotUndefined(this.oFloor.oEntranceQueue);
		assertEquals(0, this.oFloor.fpDoorQueueLenth("A"));
		assertEquals(0, this.oFloor.fpEntranceQueueLength());
		var spy = sinon.spy(this.oFloor.oEntranceQueue,"push");
		this.oFloor.fpAddPersonToEntranceQueue();
		assertEquals(1, this.oFloor.fpEntranceQueueLength());
		this.oFloor.fpAddPersonToEntranceQueue();	
		assertEquals(2, this.oFloor.fpEntranceQueueLength());			
		assertTrue(spy.calledTwice);
		this.oFloor.oEntranceQueue.push.restore();
	}
})
TestCase("Test for comprove if I can move one person from the entrance to the pannel queue",{
	setUp : function() {
		this.oFloor = new Floor(2, 2);
		this.oPerson1 = {"id" : 1 };
		this.oPerson2 = {"id" : 2 };
	},
	tearDown : function() {

	},
	"test for move one person" : function() {
		assertNotUndefined(this.oFloor.oEntranceQueue);
		assertEquals(0, this.oFloor.fpDoorQueueLenth("A"));
		assertEquals(0, this.oFloor.fpEntranceQueueLength(this.oPerson1));
		assertEquals(0, this.oFloor.fpControlPannelQueueLength("A"));
		var spy = sinon.spy(this.oFloor.oEntranceQueue,"push");
		this.oFloor.fpAddPersonToEntranceQueue(this.oPerson2);
		assertEquals(1, this.oFloor.fpEntranceQueueLength());
		this.oFloor.fpAddPersonToEntranceQueue();	
		assertEquals(2, this.oFloor.fpEntranceQueueLength());			
		assertTrue(spy.calledTwice);
		this.oFloor.fpMoveFromEntranceToPannelQueue("A");
		assertEquals(1, this.oFloor.fpEntranceQueueLength());	
		assertEquals(1, this.oFloor.fpControlPannelQueueLength("A"));
		assertEquals(0, this.oFloor.fpControlPannelQueueLength("B"));
		this.oFloor.fpMoveFromEntranceToPannelQueue("B");
		assertEquals(1, this.oFloor.fpControlPannelQueueLength("B"));
		assertEquals(0, this.oFloor.fpEntranceQueueLength());	
		this.oFloor.oEntranceQueue.push.restore();
	}
})

TestCase("Test for comprove if I can move one person from the entrance to the door queue",{
	setUp : function() {
		this.oFloor = new Floor(2, 2);
		this.oPerson1 = {"id" : 1 };
		this.oPerson2 = {"id" : 2 };
	},
	tearDown : function() {

	},
	"test for move one person" : function() {
		assertEquals(0, this.oFloor.fpDoorQueueLenth("A"));
		assertEquals(0, this.oFloor.fpEntranceQueueLength());
		assertEquals(0, this.oFloor.fpControlPannelQueueLength("A"));
		this.oFloor.fpAddPersonToEntranceQueue(this.oPerson1);
		assertEquals(1, this.oFloor.fpEntranceQueueLength());
		this.oFloor.fpAddPersonToEntranceQueue(this.oPerson2);	
		assertEquals(2, this.oFloor.fpEntranceQueueLength());			
		this.oFloor.fpMoveFromEntranceToPannelQueue("A");
		assertEquals(1, this.oFloor.fpEntranceQueueLength());	
		assertEquals(1, this.oFloor.fpControlPannelQueueLength("A"));
		this.oFloor.fpMoveFromControlPannelToDoorQueue("A","A");
		assertEquals(0, this.oFloor.fpControlPannelQueueLength("A"));
		assertEquals(1, this.oFloor.fpDoorQueueLenth("A"));
	}
})
TestCase("Test for comprove if I can extrac one Person from the floor",{
	setUp : function() {
		this.oFloor = new Floor(2, 2);
		this.oPerson1 = {"id" : 1 };
		this.oPerson2 = {"id" : 2 };
	},
	tearDown : function() {

	},
	"test for move one person" : function() {
		this.oFloor.fpAddPersonToEntranceQueue(this.oPerson1);
		this.oFloor.fpAddPersonToEntranceQueue(this.oPerson2);		
		this.oFloor.fpMoveFromEntranceToPannelQueue("A");
		this.oFloor.fpMoveFromControlPannelToDoorQueue("A","A");
		assertEquals(1, this.oFloor.fpDoorQueueLenth("A"));
		assertEquals(this.oPerson1, this.oFloor.fpExtracFromDoorQueue("A"));
		this.oFloor.fpMoveFromEntranceToPannelQueue("A");
		this.oFloor.fpMoveFromControlPannelToDoorQueue("A","A");
		assertEquals(1, this.oFloor.fpDoorQueueLenth("A"));		
		assertEquals(this.oPerson2, this.oFloor.fpExtracFromDoorQueue("A"));
	}
})

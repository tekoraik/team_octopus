function commonSetUp(){
		this.queue = new Queue();
		this.oObject = {"a" : "Hola"};	
};
function commonTearDown(){

};
TestCase("This is the test case comprove if the queue is create", {
	setUp : function(){	
		commonSetUp.call(this);
 	},
	tearDown : function(){
	},
	"test This test porve if I create the queue" : function(){
		assertNotUndefined(this.queue);
	}
});
TestCase("This is the test case comprove the method push shift and length", {
	setUp : function(){	
		commonSetUp.call(this);
 	},
	tearDown : function(){
	},
	"test This test porve if I push any element" : function(){
		assertEquals(0, this.queue.length() );
		this.queue.push(this.oObject);
		assertEquals(1, this.queue.length() );	
		var oRetired = this.queue.shift();
		assertEquals(0, this.queue.length() );
		assertEquals(this.oObject, oRetired);
		assertFalse(this.queue.hasMoreElements() );			
	}
});
TestCase("This tests comprove if the function hasMoreElements", {
	setUp : function(){
		commonSetUp.call(this);
		this.queue.push(this.oObject);		
	},
	tearDown : function(){

	}, 
	"test this test comprove the elements" : function(){
		assertTrue( this.queue.hasMoreElements() );
		this.queue.shift();
		assertFalse( this.queue.hasMoreElements() );
	}
})
TestCase("This tests comprove if the function getFirst Element", {
	setUp : function(){
		commonSetUp.call(this);
		this.queue.push(this.oObject);		
	},
	tearDown : function(){

	}, 
	"test this test comprove if return the correct element and dont substract the element" : function(){
		assertTrue( this.queue.hasMoreElements() );
		assertEquals(this.oObject, this.queue.getFirstElement() );
		this.queue.shift();
		assertFalse(this.queue.getFirstElement() );


	}
})

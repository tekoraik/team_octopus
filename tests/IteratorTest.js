/**
 * Test Iterator floor
 * @author Regino Ballester
 */
( function ( win, doc, util, undefined ) {
	TestCase( "Iterator Floor", {
		"test if exists hasNextFloor in iterator" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertFunction( iterator.hasNextFloor );
		},
		"test if  bulding has next floor" : function () {
			var iterator = new util.IteratorFloor( 5, 5 );

			assertFalse( iterator.hasNextFloor() );
		},
		"test if exists hasPreviousFloor in iterator" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertFunction( iterator.hasPreviousFloor );
		},
		"test if  bulding has next floor" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertFalse( iterator.hasPreviousFloor() );
		},
		"test if exists getNextFloor in iterator" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertFunction( iterator.getNextFloor );
		},
		"test what is the next floor" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertEquals( 1, iterator.getNextFloor() );
		},
		"test if being on the top floor can get other next floor" : function () {
			var iterator = new util.IteratorFloor( 5, 5 );

			assertUndefined( iterator.getNextFloor() );
		},
		"test if exists getPreviousFloor in iterator" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertFunction( iterator.getPreviousFloor );
		},
		"test what is the previous floor" : function () {
			var iterator = new util.IteratorFloor( 4, 5 );

			assertEquals( 3, iterator.getPreviousFloor() );
		},
		"test if being on the first floor can get other previous floor" : function () {
			var iterator = new util.IteratorFloor( 0, 5 );

			assertUndefined( iterator.getPreviousFloor() );
		},
		
	} );
	
} ( window, document, Namespace.utilities ) );
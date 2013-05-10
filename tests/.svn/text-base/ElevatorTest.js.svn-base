/**
 * Test class Elevator
 * @author Regino Ballester
 */
( function ( win, doc, model, undefined ) {
	TestCase( "Elevator Class", {
		setUp : function () {
			this.elevator = new model.Elevator( "A", 5, 0 );
		},
		"test if exists addStops in elevator" : function () {
			assertFunction( this.elevator.addStops );
		},
		"test if add to pendingStop a new stopped" : function () {
			this.elevator.addStops( 4 );
			assertEquals( [4], this.elevator.aPendingStops );
		},
		"test if when elevator is called change its state to working" : function () {
			this.elevator.addStops( 4 );
			assertFalse( this.elevator.bFinished );
		},
		"test if exists calculateDirection in elevator" : function () {
			assertFunction( this.elevator.calculateDirection );
		},
		"test return direction when elevator goes to floor 0 if it stays in floor 4" : function () {
			this.elevator.nCurrentFloor = 4;			
			assertEquals( "down", this.elevator.calculateDirection( 0 ) );
		},
		"test if elevator changes its direction when addStops(0) from current floor 4" : function () {
			this.elevator.nCurrentFloor = 4;
			this.elevator.addStops( 0 );
			assertEquals( "down", this.elevator.sDirection );
		},
		"test if exists hasPendingStops in elevator" : function () {
			assertFunction( this.elevator.hasPendingStops );
		},
		"test if elevator has a pending stop" : function () {
			this.elevator.addStops( 0 );
			assertEquals( true, this.elevator.hasPendingStops() );
		},
		"test if exists deleteCurrentFloorFromPendingStops in elevator" : function () {
			assertFunction( this.elevator.deleteCurrentFloorFromPendingStops );
		},
		"test if deletes a pending stop in elevator" : function () {
			this.elevator.addStops( 0 );
			this.elevator.deleteCurrentFloorFromPendingStops();
			assertEquals( [], this.elevator.aPendingStops );
		},
		
		"test if exists moveToNextFloor in elevator" : function () {
			assertFunction( this.elevator.moveToNextFloor );
		},
		"test if elevator moves to next floor assigned" : function () {
			this.elevator.nCurrentFloor = 0;
			this.elevator.moveToNextFloor();
			assertEquals( 1, this.elevator.nCurrentFloor )
		},		
		"test if exists addPerson in elevator" : function () {
			assertFunction( this.elevator.addPerson );
		},
		"test if when a person wants enter to elevator weight of it is added" : function () {
			var oPerson = { nWeight : 75 };
			
			this.elevator.addPerson( oPerson );
			assertEquals( 75, this.elevator.nCurrentWeight );
		},
		"test if when have a maximum weight elevator returns person that tried to enter" : function () {
			var oPerson = { nWeight : 75 };
			
			this.elevator.nCurrentWeight = 450;
			assertEquals( oPerson, this.elevator.addPerson( oPerson ) );			
		},
		"test if elevator includes that this person goes a destination" : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };
			
			this.elevator.addPerson( oPerson );
			assertEquals( [oPerson], this.elevator.oCurrentPersonInsideElevator[5] );
		},
		"test if updates current people when add people" : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };
			
			this.elevator.addPerson( oPerson );			
			assertEquals( 1, this.elevator.oInformation.nCurrentPeople );
		},
		"test if updates total people transported " : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };
			
			this.elevator.addPerson( oPerson );			
			assertEquals( 1, this.elevator.oInformation.nTotalPeopleTransported );
		},
		"test if exists peopleExitsElevator in elevator" : function () {
			assertFunction( this.elevator.peopleExitsElevator );
		},
		"test if people exits from elevator" : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };

			this.elevator.addPerson( oPerson );
			assertEquals( [oPerson], this.elevator.oCurrentPersonInsideElevator[5] );
			this.elevator.nCurrentFloor = 5;
			this.elevator.peopleExitsElevator();
			assertUndefined( this.elevator.oCurrentPersonInsideElevator[5] );
		},
		"test if when people exits from elevator this updates its weight" : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };

			this.elevator.addPerson( oPerson );
			assertEquals( 75, this.elevator.nCurrentWeight );
			this.elevator.nCurrentFloor = 5;
			this.elevator.peopleExitsElevator();
			assertEquals( 0, this.elevator.nCurrentWeight );
		},
		"test if updates current people when people exits" : function () {
			var oPerson = { nWeight : 75, nDestinationFloor : 5 };
			
			this.elevator.addPerson( oPerson );			
			assertEquals( 1, this.elevator.oInformation.nCurrentPeople );
			this.elevator.nCurrentFloor = 5;
			this.elevator.peopleExitsElevator();
			assertEquals( 0, this.elevator.oInformation.nCurrentPeople );
		},
	} );
	
} ( window, document, Namespace.model ) );
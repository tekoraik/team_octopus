/**
 * Object with all methods
 * @type {Object}
 */
var Namespace = Namespace || {};

/**
 * Object with classes
 * @type {Object}
 */
Namespace.classes = Namespace.classes || {};

/**
 * Class Person
 * @autor Alexander Flores
 */
Namespace.classes.Person = function ( oOptions ) {
    nFloorOrigin = oOptions.nOrigin || 0;
    this.nFloorDestination = oOptions.nDestination || 1;
    this.nTimeStart = oOptions.nTimeStart || 0;
    this.nTimeFinish = oOptions.nTimeStart || 0;
    this.sPanel = oOptions.sPanel || "A";
    this.nWeight = oOptions.nWeight || 75;
    this.sName = oOptions.sName || "alex";
    this.bDisabled = oOptions.bDisabled || false;
}
Namespace.classes.Person.prototype.addTime = function ( nTime ) {
    this.nTimeFinish = this.nTimeFinish + nTime;
}
Namespace.classes.Person.prototype.setTime = function ( nTime ) {
    this.nTimeStart = nTime;
}
Namespace.classes.Person.prototype.getPanel = function () {
    return this.sPanel;
}
Namespace.classes.Person.prototype.getWeight = function () {
    return this.nWeight;
}
Namespace.classes.Person.prototype.isDisabled = function () {
    return this.bDisabled;
}

/**
 * Class Door 
 * @autor Regino Ballester
 */
//(si no se usa borrar y actualizar la factory)
Namespace.classes.Door = function( oOptions) {
    this.nFloor = oOptions.nFloor;
    this.nWordIdentification = oOptions.nWordIdentification; 
}
Namespace.classes.Door.prototype.getFloor = function () {
    return this.nFloor;
}
Namespace.classes.Door.prototype.getWord = function () {
    return this.nWordIdentification;
}

/**
 * Class Queue
 * @autor Alexander Flores
 */
Namespace.classes.Queue = function () {
    this.aElement = [];
}
Namespace.classes.Queue.prototype.push = function ( oElement ) {
    this.aElement.push( oElement );
}
Namespace.classes.Queue.prototype.shift = function () {
    return this.aElement.shift();
}
Namespace.classes.Queue.prototype.length = function () {
    return this.aElement.length;
}
Namespace.classes.Queue.prototype.getFirtsElement = function () {
    return this.aElement[0];
}
Namespace.classes.Queue.prototype.hasMoreElements = function () {
    return this.aElement > 0;
}

/**
 * Define a skeleton objects Person, Queue and Door factory
 * @author Regino Ballester
 */
Namespace.classes.FloorObjectFactory = function() {}

/**
 * Define the prototypes and utilities for this factory
 * Our default floorObjectClass is Person
 * @author Regino Ballester
 */
Namespace.classes.FloorObjectFactory.prototype.floorObjectClass = Namespace.classes.Person;

/**
 * Our Factory method for creating new Object instances
 * @author Regino Ballester
 * @param  {Object} options Contains all necesary properties to new object
 * @return {[type]}         [description]
 */
Namespace.classes.FloorObjectFactory.prototype.createFloorObject = function ( oOptions ) {
    if( oOptions.objectType == "person" ){
        this.floorObjectClass = Namespace.classes.Person;
    } else if ( oOptions.objectType == "queue" ) {
        this.floorObjectClass = Namespace.classes.Queue;
    } else {
        this.floorObjectClass = Namespace.classes.Door;
    }

    return new this.floorObjectClass( oOptions )
}


/**
 * Class Observer
 * @author AlexanderFlores
 */
Namespace.classes.Observer = function () {
    this.aList = [];
}
Namespace.classes.Observer.prototype.subscribe = function ( fnCallback ) {
    this.aList.push( fnCallback );
}
Namespace.classes.Observer.prototype.publish = function () {
    var i = 0,
        nLength = this.aList.length;
    for ( ; i < nLength; ++i ) {
        this.aList[i]();
    }
}

/**
 * Iterator whit methods to move elevator
 * @param {Number} nNumberOfFloors 
 * @param {Number} nOrigin  
 * @author Regino Ballester, Rafael Yepes       
 */
Namespace.classes.IteratorFloor = function ( nNumberOfFloors, nOrigin ) {
    var _nNumberOfFloors = nNumberOfFloors,
        _nIndex = nOrigin  || 0;

    /**
     * Ascends a building floor
     * @return {Number}
     */
    function _getNextFloor() {
        if ( _hasNextFloor() ) {
            _nIndex++;
        }
        return _nIndex;
    }

    /**
     * Checks if bulding has more floors
     * @return {Boolean} 
     */
    function _hasNextFloor() {
        return _nIndex < _nNumberOfFloors - 1;
    }

    /**
     * Descends a building floor
     * @return {Number}
     */
    function _getPreviousFloor() {
        if ( _hasPrevious() ) {
            _nIndex--;
        }
        return _nIndex;
    }

    /**
     * Checks if it is on the first floor
     * @return {Boolean} 
     */
    function _hasPreviousFloor() {
        return _nIndex > 0;
    }
    return {
        getNextFloor : _getNextFloor,
        hasNextFloor : _hasNextFloor,
        getPreviousFloor : _getPreviousFloor,
        hasPreviousFloor : _hasPreviousFloor
    };
}



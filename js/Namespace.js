/**
 * Object with all methods
 * @type {Object}
 */
var Namespace = Namespace || {};

/**
 * Object with classes
 * @type {Object}
 */
Namespace.utilities = Namespace.utilities || {};

/**
 * Iterator whit methods to move elevator
 * @param {Number} nNumberOfFloors 
 * @param {Number} nOrigin 
 * @author Rafael Yepes, Regino Ballester        
 */
Namespace.utilities.IteratorFloor = function ( nPosition, nNumberOfFloors ) {
    var _nNumberOfFloors = nNumberOfFloors,
        _nIndex = nPosition  || 0;
    
    /**
     * Checks if bulding has more floors
     * @return {Boolean} 
     */
    function _hasNextFloor() {
        return _nIndex < _nNumberOfFloors - 1;
    }
    
    /**
     * Checks if it is on the first floor
     * @return {Boolean} 
     */
    function _hasPreviousFloor() {
        return _nIndex > 0;
    }

    /**
     * Ascends a building floor
     * @return {Number}
     */
    function _getNextFloor() {
        if ( _hasNextFloor() ) {
            _nIndex++;
            return _nIndex;
        } 
    }  

    /**
     * Descends a building floor
     * @return {Number}
     */
    function _getPreviousFloor() {
        if ( _hasPreviousFloor() ) {
            _nIndex--;
            return _nIndex;
        } 
    }
      
    return {
        getNextFloor : _getNextFloor,
        hasNextFloor : _hasNextFloor,
        getPreviousFloor : _getPreviousFloor,
        hasPreviousFloor : _hasPreviousFloor
    };
}
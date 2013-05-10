//Authors Rafa y Regino
/**
 * Iterator whit methods to move elevator
 * @param {Number} nNumberOfFloors 
 * @param {Number} nOrigin         
 */
IteratorFloor = function ( nNumberOfFloors, nOrigin ) {
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
};

var Namespace = Namespace || {};
(function (win, doc, ns) {
    /**
     * Class that represents the people in the system.
     * @autor Alexander Flores, Rafael Yepes
     * @param {Object} oOptions Configuration object that might contain some set parameters
     *                          to set to person.
     * @attribute {Number} nFloorOrigin The initial floor where the person was before enter
     *                                  in the elevator
     * @attribute {Number} nFloorDestination    The floor where the person wants to go with the
     *                                          elevator
     * @attribute {Number} nTimeStart   The time when the person enters in the system
     * @attribute {Array} nTimeFinish   The time when the person leaves the system
     * @attribute {Array} sPanel        The desired control panel of the person. When the person
     *                                  has to choose one panel to ask for an elevator, this value
     *                                  is used to take that decision
     * @attribute {Array} nWeight       The weight of the person
     * @attribute {Array} sName         The name of the person
     * @attribute {Array} bDisabled     Used to show if the person has some disability or not.
     */
    var Person = function ( oOptions ) {
        var _oOptions = oOptions || {};
        this.nFloorOrigin = _oOptions.nOrigin || 0;
        this.nFloorDestination = _oOptions.nDestination || 1;
        this.nTimeStart = _oOptions.nTimeStart || 0;
        this.nTimeFinish = _oOptions.nTimeStart || 0;
        this.sPanel = _oOptions.sPanel || "A";
        this.nWeight = _oOptions.nWeight || 75;
        this.sName = _oOptions.sName || "alex";
        this.bDisabled = _oOptions.bDisabled || false;
    };
    /**
     * Adds time to the parameter nTimeFinish of Person. Number passed as argument will be added
     * to that property
     * @autor Alexander Flores, Rafael Yepes
     * @param {Number} nTime Indicates the amount of time to add to the property nTimeFinish
     * @return {Object} The instance of person
     */
    Person.prototype.addTime = function ( nTime ) {
        if ((typeof nTime === "number") && (isFinite(nTime))) {
            this.nTimeFinish = this.nTimeFinish + nTime;
        }
        return this;
    };
    /**
     * Sets the starting time of the person in the system
     * @autor Alexander Flores, Rafael Yepes
     * @param {Number} nTime The value of time to set to the start time of the person
     * @return {Object} The instance of person
     */
    Person.prototype.setTime = function ( nTime ) {
        if ((typeof nTime === "number") && (isFinite(nTime))) {
            this.nTimeStart = nTime;
        }
        return this;
    };
    /**
     * Returns the desired panel of the person
     * @autor Alexander Flores
     */
    Person.prototype.getPanel = function () {
        return this.sPanel;
    };
    /**
     * Returns the weight of the person
     * @autor Alexander Flores
     */
    Person.prototype.getWeight = function () {
        return this.nWeight;
    };
    /**
     * Returns if the person is disabled or not. Or more precisely, if the person wants to use
     * the elevator as disabled
     * @autor Alexander Flores
     */
    Person.prototype.isDisabled = function () {
        return this.bDisabled;
    };
    ns.model = ns.model || {};
    ns.model.Person = Person;
})(window, document, Namespace);
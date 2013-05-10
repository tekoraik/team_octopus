/**
 * @author Rafael Yepes
 */
;(function(win, doc, Person) {
    TestCase("personTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person exists" : function () {
            assertNotUndefined(Person);
            assertFunction(Person);
        },
        "test that the constructor Person returns an object": function () {
            assertObject(this.oPerson);
        },
        "test that the returned object has some specific properties": function () {
            var oPerson = this.oPerson;
            assert(oPerson.hasOwnProperty("nFloorOrigin"));
            assertNumber(oPerson.nFloorOrigin);
            assert(oPerson.hasOwnProperty("nFloorDestination"));
            assertNumber(oPerson.nFloorDestination);
            assert(oPerson.hasOwnProperty("nFloorDestination"));
            assertNumber(oPerson.nFloorDestination);
            assert(oPerson.hasOwnProperty("nTimeFinish"));
            assertNumber(oPerson.nTimeFinish);
            assert(oPerson.hasOwnProperty("sPanel"));
            assertString(oPerson.sPanel);
            assert(oPerson.hasOwnProperty("nWeight"));
            assertNumber(oPerson.nWeight);
            assert(oPerson.hasOwnProperty("sName"));
            assertString(oPerson.sName);
            assert(oPerson.hasOwnProperty("bDisabled"));
            assertBoolean(oPerson.bDisabled);
        },
        "test that the person prototype has some specific methods": function () {
            var oPerson, oPersonPrototype;
            oPerson = this.oPerson;
            oPersonPrototype = oPerson.constructor.prototype;
            assertFunction(oPersonPrototype.addTime);
            assertFunction(oPersonPrototype.setTime);
            assertFunction(oPersonPrototype.getPanel);
            assertFunction(oPersonPrototype.getWeight);
            assertFunction(oPersonPrototype.isDisabled);
        },
        "test that when no argument are passed to the constructor, the returned person has some\
        default values in its properties": function () {
            var oPerson = this.oPerson;
            assertEquals(0, oPerson.nFloorOrigin);
            assertEquals(1, oPerson.nFloorDestination);
            assertEquals(0, oPerson.nTimeStart);
            assertEquals(0, oPerson.nTimeFinish);
            assertEquals("A", oPerson.sPanel);
            assertEquals(75, oPerson.nWeight);
            assertEquals("alex", oPerson.sName);
            assertEquals(false, oPerson.bDisabled);
        },
        "test that when an object is passed as argument to the constructor, the properties of that\
        object that have the same name as a property of Person are assigned to that property,\
        following the configuration pattern": function () {
            var oPerson,
                oConfiguration,
                _nOrigin = 3,
                _nDestination = 13,
                _nTimeStart = 11,
                _sPanel = "B",
                _nWeight = 100,
                _sName = "Rafa",
                _bDisabled = true;
            oConfiguration = {
                nOrigin: _nOrigin,
                nDestination: _nDestination,
                nTimeStart: _nTimeStart,
                sPanel: _sPanel,
                nWeight: _nWeight,
                sName: _sName,
                bDisabled: _bDisabled
            };
            oPerson = new Person(oConfiguration);
            assertEquals(_nOrigin, oPerson.nFloorOrigin);
            assertEquals(_nDestination, oPerson.nFloorDestination);
            assertEquals(_nTimeStart, oPerson.nTimeStart);
            assertEquals(_nTimeStart, oPerson.nTimeFinish);
            assertEquals(_sPanel, oPerson.sPanel);
            assertEquals(_nWeight, oPerson.nWeight);
            assertEquals(_sName, oPerson.sName);
            assertEquals(_bDisabled, oPerson.bDisabled);
        }
    });
    TestCase("personAddTimeTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person.prototype.addTime is a function" : function () {
            assertFalse(Person.hasOwnProperty("addTime"));
            assertFunction(Person.prototype.addTime);
            assertFunction(this.oPerson.addTime);
        },
        "test that when the argument is a number, the argument is added to the property nTimeFinish\
        of Person" : function () {
            var oPerson = this.oPerson,
                nTime = 0;
            assertEquals(0, oPerson.nTimeFinish);
            oPerson.addTime(nTime);
            assertEquals(0, oPerson.nTimeFinish);
            nTime = 10;
            oPerson.addTime(nTime);
            assertEquals(10, oPerson.nTimeFinish);
            nTime = -20;
            oPerson.addTime(nTime);
            assertEquals(-10, oPerson.nTimeFinish);
        },
        "test that when the argument is not a number, the value of the property nTimeFinish is not\
        modified": function () {
            var oPerson = this.oPerson,
                nTime;
            assertEquals(0, oPerson.nTimeFinish);
            nTime = "10";
            oPerson.addTime(nTime);
            assertEquals(0, oPerson.nTimeFinish);
            nTime = NaN;
            oPerson.addTime(nTime);
            assertEquals(0, oPerson.nTimeFinish);
            nTime = Infinity;
            oPerson.addTime(nTime);
            assertEquals(0, oPerson.nTimeFinish);
            nTime = {};
            oPerson.addTime(nTime);
            assertEquals(0, oPerson.nTimeFinish);
        },
        "test that calling addTime returns the instance of the person": function () {
            assertEquals(this.oPerson, this.oPerson.addTime());
            assertEquals(this.oPerson, this.oPerson.addTime(2));
            assertEquals(this.oPerson, this.oPerson.addTime("something"));
        }
    });
    TestCase("personSetTimeTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person.prototype.setTime is a function" : function () {
            assertFalse(Person.hasOwnProperty("setTime"));
            assertFunction(Person.prototype.setTime);
            assertFunction(this.oPerson.setTime);
        },
        "test that when the argument is a number, the argument is set to the property nTimeStart\
        of Person" : function () {
            var oPerson = this.oPerson,
                nTime = 0;
            assertEquals(0, oPerson.nTimeStart);
            oPerson.setTime(nTime);
            assertEquals(0, oPerson.nTimeStart);
            nTime = 10;
            oPerson.setTime(nTime);
            assertEquals(10, oPerson.nTimeStart);
            nTime = -20;
            oPerson.setTime(nTime);
            assertEquals(-20, oPerson.nTimeStart);
        },
        "test that when the argument is not a number, the value of the property nTimeStart is not\
        modified": function () {
            var oPerson = this.oPerson,
                nTime;
            assertEquals(0, oPerson.nTimeStart);
            nTime = "10";
            oPerson.setTime(nTime);
            assertEquals(0, oPerson.nTimeStart);
            nTime = NaN;
            oPerson.setTime(nTime);
            assertEquals(0, oPerson.nTimeStart);
            nTime = Infinity;
            oPerson.setTime(nTime);
            assertEquals(0, oPerson.nTimeStart);
            nTime = {};
            oPerson.setTime(nTime);
            assertEquals(0, oPerson.nTimeStart);
        },
        "test that calling setTime returns the instance of the person": function () {
            assertEquals(this.oPerson, this.oPerson.setTime());
            assertEquals(this.oPerson, this.oPerson.setTime(2));
            assertEquals(this.oPerson, this.oPerson.setTime("something"));
        }
    });
    TestCase("personGetPanelTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person.prototype.getPanel is a function" : function () {
            assertFalse(Person.hasOwnProperty("getPanel"));
            assertFunction(Person.prototype.getPanel);
            assertFunction(this.oPerson.getPanel);
        },
        "test that getPanel always returns the property sPanel of Person" : function () {
            var oPerson = this.oPerson;
            assertEquals("A", oPerson.getPanel());
            oPerson.sPanel = "Panel";
            assertEquals("Panel", oPerson.getPanel());
            oPerson.sPanel = 10;
            assertEquals(10, oPerson.getPanel());
            oPerson.sPanel = {"panel": 1};
            assertEquals({"panel": 1}, oPerson.getPanel());
        }
    });
    TestCase("personGetWeightTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person.prototype.getWeight is a function" : function () {
            assertFalse(Person.hasOwnProperty("getWeight"));
            assertFunction(Person.prototype.getWeight);
            assertFunction(this.oPerson.getWeight);
        },
        "test that getWeight always returns the property nWeight of Person" : function () {
            var oPerson = this.oPerson;
            assertEquals(75, oPerson.getWeight());
            oPerson.nWeight = "Panel";
            assertEquals("Panel", oPerson.getWeight());
            oPerson.nWeight = 10;
            assertEquals(10, oPerson.getWeight());
            oPerson.nWeight = {"panel": 1};
            assertEquals({"panel": 1}, oPerson.getWeight());
        }
    });
    TestCase("personIsDisabledTest", {
        setUp: function () {
            this.oPerson = new Person();
        },
        tearDown: function () {
            this.oPerson = undefined;
        },
        "test that the constructor Person.prototype.isDisabled is a function" : function () {
            assertFalse(Person.hasOwnProperty("isDisabled"));
            assertFunction(Person.prototype.isDisabled);
            assertFunction(this.oPerson.isDisabled);
        },
        "test that isDisabled always returns the property bDisabled of Person" : function () {
            var oPerson = this.oPerson;
            assertEquals(false, oPerson.isDisabled());
            oPerson.bDisabled = "Panel";
            assertEquals("Panel", oPerson.isDisabled());
            oPerson.bDisabled = 10;
            assertEquals(10, oPerson.isDisabled());
            oPerson.bDisabled = {"panel": 1};
            assertEquals({"panel": 1}, oPerson.isDisabled());
        }
    });
})(window, document, Namespace.model.Person);
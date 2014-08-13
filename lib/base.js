var ko = require('knockout');

module.exports = require('mixin-class').extend(
    function() {
        this.__init();
    },
    {       
        // to be implement
        __init: function() {},

        observable: function(key, value) {
            if (!this[key]) {
                this[key] = ko.observable();
            }
            if (arguments.length === 1) {
                return this[key]();
            }
            else {
                this[key](value);
                return this;
            }
        },

        prop: function(key, value) {
            if (arguments.length === 1) {
                return this[key]
            }
            else {
                this[key] = value;
                return this;
            }
        },

        forEach: function(fn) {
            return fn(this);
        }
    }
);


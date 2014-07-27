var ko = require('knockout');

module.exports = require('mixin-class').extend(
    // data
    function() {
        this.value = this.__createPropertyValue();
        this.reset();
    },
    {
        defaultValue: null,
        
        reset: function() {
            this.set(this.defaultValue);
        },

        __createPropertyValue: function() {            
            return ko.observable();
        },

        set: function(v) {
            this.value(v);
        },

        get: function() {
            return this.value();
        }
    }
);


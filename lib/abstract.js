var ko = require('knockout');

module.exports = require('mixin-class').extend(
    // data
    function() {
        this.value = this._createValue();
    },
    {
        defaultValue: null,
        
        reset: function() {
            this.set(this.defaultValue);
        },

        // to be implemented
        _createValue: function() {},

        set: function(v) {
            this.value(v);
        },

        get: function() {
            return this.value();
        }
    }
);


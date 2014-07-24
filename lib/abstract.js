var ko = require('knockout');

module.exports = require('mixin-class').extend(
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

// lazy init
Object.defineProperties(module.exports.prototype, {
    visible: {
        get: function() {
            if (!this._visible) {
                this._visible = ko.observable(true);
            }
            return this._visible;
        }
    },
    editable: {
        get: function() {
            if (!this._editable) {
                this._editable = ko.observable(true);
            }
            return this._editable;
        }
    }
})


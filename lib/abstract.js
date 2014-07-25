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
    },

    // state
    function() {        
        this.visible = ko.observable(true);
        this.editable = ko.observable(true);
    },

    // validator
    function() {
        // clone validators
        this.validators = this.validators.concat([]);
    },
    {
        validators: [],

        validate: function(allMsgs) {
            // must activated
            if (!(this.visible() && this.editable())) {
                return;
            }

            var self = this;
            var msgs = [];
            var value = this.get();

            this.validators.forEach(function(validator) {
                var msg = validator.call(self, value);
                if (msg) {
                    msgs.push(msg);
                }        
            });

            if (msgs.length) {
                allMsgs.push([this, msgs]);
            }
        }
    }
);


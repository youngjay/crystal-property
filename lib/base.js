var ko = require('knockout');

module.exports = require('mixin-class').extend(
    function() {
        this.init();
    },
    {       
        prop: function(key, value) {
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
        }
    }
);


var ko = require('knockout');
var _ = require('lodash');

module.exports = require('./plain').extend(
    {
        defaultValue: [],

        __createPropertyValue: function() {
            return ko.observableArray();
        },

        reset: function() {
            this.value(this.defaultValue.concat([]));
        },

        forEach: function(fn) {
            _.forEach(this.value(), fn);
        }
    }
);
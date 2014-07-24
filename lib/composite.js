var ko = require('knockout');
var _ = require('lodash');

module.exports = require('./abstract').extend(
    {
        mapping: {},

        _createValue: function() {
            var props = {};
            var self = this;
            _.forEach(this.mapping, function(Class, key) {
                var property = new Class();
                self[key] = props[key] = property;
            });

            return props;
        },

        forEach: function(fn) {
            _.forEach(this.value, fn);
        },

        set: function(o) {
            if (!o) {
                o = {};
            }
            this.forEach(function(property, key) {
                property.set(o[key]);
            });           
        },

        get: function() {            
            var ret = {};
            this.forEach(function(property, key) {
                ret[key] = property.get();
            });
            return ret;
        }
    }
)
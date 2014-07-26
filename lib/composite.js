var ko = require('knockout');
var _ = require('lodash');


var Composite = require('./abstract').extend(
    {
        _createValue: function() {
            var props = {};
            var self = this;
            var storage = this.constructor;

            storage.mapping().forEach(function(key) {
                var property = new storage[key]();

                property.__parent = self;
                property.__key = key;
                
                self[key] = props[key] = property;
            });

            return props;
        },

        forEach: function(fn) {
            _.forEach(this.value, fn);
        },

        set: function(o) {
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
);

var MAPPING_KEYS = '__mapping_keys';

Composite[MAPPING_KEYS] = [];

Composite.mapping = function(mapping) {
    if (arguments.length) {        
        _.extend(this, mapping);
        this[MAPPING_KEYS] = this[MAPPING_KEYS].concat(Object.keys(mapping));
        return this;
    }
    else {
        return this[MAPPING_KEYS];
    }
};

module.exports = Composite;
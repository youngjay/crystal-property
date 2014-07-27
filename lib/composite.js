var ko = require('knockout');
var _ = require('lodash');


var Composite = require('./plain').extend(
    {
        defaultValue: {},

        __createPropertyValue: function() {
            var props = {};
            var self = this;

            _.forEach(this.constructor.mapping(), function(PropertyClass, key) {
                var property = new PropertyClass();

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
                if (key in o) {
                    property.set(o[key]);
                }
            });           
        },

        get: function() {            
            var ret = {};
            this.forEach(function(property, key) {
                ret[key] = property.get();
            });
            return ret;
        },

        reset: function() {
            this.forEach(function(property) {
                property.reset();
            })
        }
    }
);

var MAPPING_KEYS = '__mapping_keys';

Composite[MAPPING_KEYS] = [];

Composite.mapping = function(mapping) {
    if (arguments.length) {        
        _.extend(this, mapping);
        this[MAPPING_KEYS] = _.uniq(this[MAPPING_KEYS].concat(Object.keys(mapping)));
        return this;
    }
    else {
        return _.pick(this, this[MAPPING_KEYS]);
    }
};

// cascade extend
var extend = Composite.extend;
Composite.extend = function() {
    var SubClass = extend.apply(this, arguments);
    SubClass.mapping(_.reduce(SubClass.mapping(), function(ret, PropertyClass, key) {
        ret[key] = PropertyClass.extend();
        return ret;
    }, {}));
    return SubClass;
};

module.exports = Composite;
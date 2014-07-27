var _ = require('lodash');

var Plain = require('./lib/plain');
var NumberProperty = require('./lib/number');
var ArrayProperty = require('./lib/array');
var Composite = require('./lib/composite');
var TypedArray = require('./lib/typed-array');

var isPropertyClass = function(o) {
    return _.isFunction(o) && _.isFunction(o.prototype.__createPropertyValue);
};

var generate = function(o) {
    if (isPropertyClass(o)) {
        return o;
    }

    if (_.isArray(o)) {
        if (o.length) {
            return TypedArray.extend().mapping(generate(o[0]));
        }
        else {
            return ArrayProperty.extend();
        }
    }

    if (_.isObject(o)) {
        return Composite.extend().mapping(_.reduce(o, function(ret, sub, key) {
            ret[key] = generate(sub);
            return ret;
        }, {}));
    }

    if (_.isNumber(o)) {
        return NumberProperty.extend({
            defaultValue: o
        });
    }

    return Plain.extend({
        defaultValue: o
    });
};

var cascade = function(PropertyClass, iterator, paths) {
    if (!paths) {
        paths = [];
    }

    iterator(paths, PropertyClass);

    if (PropertyClass.mapping) {
        var mapping = PropertyClass.mapping();
        if (isPropertyClass(mapping)) {
            cascade(mapping, iterator, paths.concat(['mapping']));
        }
        else {
            _.forEach(mapping, function(SubPropertyClass, key) {
                cascade(SubPropertyClass, iterator, paths.concat([key]));
            });
        }
    }
};

var mix = function(PropertyClass, object) {
    if (PropertyClass.mapping) {
        if (object['.']) {
            PropertyClass.mix(object['.']);
        }

        var mapping = PropertyClass.mapping();

        // typed array
        if (isPropertyClass(mapping)) {
            mix(mapping, object['mapping']);
        }
        // composite
        else {
            _.forEach(object, function(o, key) {
                // already mapped above
                if (key !== '.' && mapping[key]) {
                    mix(mapping[key], o);
                }
            })
        }
    }
    else {
        PropertyClass.mix(object);
    };
};


module.exports = {

    Plain: Plain,
    Number: NumberProperty,
    Array: ArrayProperty,
    TypedArray: TypedArray,
    Composite: Composite,

    generate: generate,
    cascade: cascade,
    mix: mix,
};


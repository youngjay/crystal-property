var _ = require('lodash');

var Plain = require('./lib/plain');
var NumberProperty = require('./lib/number');
var ArrayProperty = require('./lib/array');
var Composite = require('./lib/composite');
var TypedArray = require('./lib/typed-array');

var isPropertyClass = function(o) {
    return _.isFunction(o) && _.isFunction(o.__createPropertyValue);
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


module.exports = {

    Plain: Plain,
    Number: NumberProperty,
    Array: ArrayProperty,
    TypedArray: TypedArray,
    Composite: Composite,

    generate: generate
};


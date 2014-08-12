var _ = require('lodash');
var mixin = require('mixin-class');

var Plain = require('./lib/plain');
var NumberProperty = require('./lib/number');
var TypedArray = require('./lib/array');
var Map = require('./lib/map');

var Builder = mixin(
    function(tag) {
        this.tag = _.extend({}, this.tag, tag);
    },
    {
        isValue: function(config) {
            return 'value' in config;
        },

        build: function(config) {
            var self = this;
            if (this.isValue(config)) {
                var tag = this.tag;
                var plainMixin = {};
                var mixinList = [];
                var self = this;             
                _.forEach(config, function(value, key) {
                    if (key in tag) {
                        mixinList.push(tag[key](value, self));
                    }
                    else {
                        plainMixin[key] = value;
                    }
                });
                mixinList.push(plainMixin);
                return mixin(mixinList);
            }
            else {
                return _.extend(Map.extend(), _.reduce(config, function(ret, subConfig, key) {
                    ret[key] = self.build(subConfig);
                    return ret;
                }, {}))                
            }
        },

        tag: {
            value: function(value, builder) {                
                if (_.isArray(value)) {
                    return _.extend(TypedArray.extend(), {
                        element: builder.build(value[0])
                    });
                }
                if (_.isNumber(value)) {
                    return NumberProperty.extend();
                }
                return Plain.extend()
            }
        }
    }
)

module.exports = {
    Plain: Plain,
    Number: NumberProperty,
    Array: TypedArray,
    Map: Map,
    Builder: Builder
};


var ko = require('knockout');
var _ = require('lodash');
var slice = [].slice;

module.exports = require('./base').extend(
    function() {
        this.element = this.constructor.element.extend({
            __parent: this
        });
    },
    {
        __init: function() {
            this.array = ko.observableArray();
        },

        __forEach: function(fn) {
            _.forEach(this.array(), fn);
        },

        allocate: function(array, length) {
            if (array.length > length) {
                array.slice(length).__forEach(function(sub) {
                    // TODO destory sub
                });
                return array.slice(0, length);
            }
            else {
                var self = this;
                _.times(length - array.length, function() {
                    array.push(new self.element());
                });
            }
        },

        __invoke: function(methodName, name, o) {   
            if (arguments.length === 2) { 
                var ret = [];
                this.__forEach(function(sub, key) {
                    ret[key] = sub[methodName](name);
                });
                return ret;
            }
            else {
                if (!_.isArray(o)) {
                    this.__forEach(function(sub, key) {
                        sub[methodName](name, o);
                    });
                }
                else {
                    var array = this.array();
                    this.allocate(array, o.length);
                    _.forEach(array, function(sub, key) {
                        sub[methodName](name, o[key]);
                    });
                    this.array(array);
                }
                return this;
            }
        }        
    }
);

module.exports.element = require('./plain');

var p = module.exports.prototype;

_.forEach(require('./base').prototype, function(fn, name) {
    if (name.indexOf('_') !== 0) {
        p[name] = function() {    
            return this.__invoke.apply(this, [name].concat(slice.call(arguments)));
        }
    }    
});
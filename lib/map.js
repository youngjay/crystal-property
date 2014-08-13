var ko = require('knockout');
var _ = require('lodash');
var slice = [].slice;

module.exports = require('./plain').extend(
    {
        __init: function() {
            var props = this.__props = {};
            var self = this;

            var host = this.constructor;
            var i;
            for (i in host) {
                if (host.hasOwnProperty(i)) {
                    var PropertyClass = host[i];
                    if (typeof PropertyClass === 'function' && typeof PropertyClass.prototype.prop === 'function') {
                        var property = new PropertyClass();
                        property.__parent = self;                        
                        self[i] = props[i] = property;
                    }
                }
            }
        },

        __forEach: function(fn) {
            _.forEach(this.__props, fn);
        },

        __invoke: function(methodName, name, o) {
            if (arguments.length === 2) {
                var ret = {};
                this.__forEach(function(sub, key) {
                    ret[key] = sub[methodName](name);
                });
                return ret;
            }
            else {
                this.__forEach(_.isPlainObject(o) ? function(sub, key) {
                    if (key in o) {
                        sub[methodName](name, o[key]);
                    }
                } : function(sub, key) {
                    sub[methodName](name, o);
                });
                return this;
            }
        }
    }
);

var p = module.exports.prototype;

_.forEach(require('./base').prototype, function(fn, name) {
    if (name.indexOf('_') !== 0) {
        p[name] = function() {    
            return this.__invoke.apply(this, [name].concat(slice.call(arguments)));
        }
    }    
});
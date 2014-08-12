var ko = require('knockout');
var _ = require('lodash');

module.exports = require('./plain').extend(
    {
        init: function() {
            var props = this.props = {};
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

        forEach: function(fn) {
            _.forEach(this.props, fn);
        },

        prop: function(name, o) {    
            if (arguments.length === 1) {
                var ret = {};
                this.forEach(function(sub, key) {
                    ret[key] = sub.prop(name);
                });
                return ret;
            }
            else {
                var fn = typeof o === 'object' ? function(sub, key) {
                    if (key in o) {
                        sub.prop(name, o[key]);
                    }
                } : function(sub) {
                    sub.prop(name, o);
                }
                this.forEach(fn);
                return this;
            }
        }
    }
);
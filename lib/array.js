var ko = require('knockout');
var _ = require('lodash');

var TypedArray = require('./base').extend(
    function() {
        this.element = this.constructor.element.extend({
            __parent: this
        });
    },
    {
        init: function() {
            this.array = ko.observableArray();
        },

        forEach: function(fn) {
            _.forEach(this.array(), fn);
        },

        allocate: function(array, length) {
            if (array.length > length) {
                array.slice(length).forEach(function(sub) {
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

        prop: function(name, o) {    
            if (arguments.length === 1) {
                var ret = [];
                this.forEach(function(sub, key) {
                    ret[key] = sub.prop(name);
                });
                return ret;
            }
            else {
                if (!_.isArray(o)) {
                    this.forEach(function(sub) {
                        sub.prop(name, o);
                    });
                }
                else {
                    var array = this.array();
                    this.allocate(array, o.length);
                    _.forEach(array, function(sub, i) {
                        sub.prop(name, o[i]);
                    });
                    this.array(array);
                    return this;
                }
            }
        }
        
    }
);

TypedArray.element = require('./plain');

module.exports = TypedArray;
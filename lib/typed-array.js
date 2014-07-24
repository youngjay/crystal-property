var Base = require('./array');

var set = Base.prototype.set;
var get = Base.prototype.get;


module.exports = Base.extend(
    function() {
        if (typeof this.mapping !== 'function') {
            throw new Error('TypedArray must specified a Function(Class) for `mapping`');
        }
    },
    {
        mapping: null,

        set: function(objects) {
            var Class = this.mapping;
            set.call(this, objects.map(function(object) {
                var property = new Class();
                property.set(object);
                return property;
            }));
        },

        get: function() {
            return get.call(this).map(function(property) {
                return property.get();
            });
        }
    }
)
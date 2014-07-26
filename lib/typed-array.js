var Base = require('./array');

var set = Base.prototype.set;
var get = Base.prototype.get;


var TypedArray = Base.extend(
    {
        set: function(objects) {
            var creator = this.constructor;
            set.call(this, objects.map(function(object) {
                return creator.mappedCreate(object);
            }));
        },

        get: function() {
            return get.call(this).map(function(property) {
                return property.get();
            });
        }
    }
);

TypedArray.mappedCreate = function(object) {
    var property = new (this.mapping())();
    property.set(object);
    property.__parent = this;
    return property;
};

TypedArray.mapping = function(PropertyClass) {
    if (arguments.length) {
        this.mappedType = PropertyClass;
        return this;
    }
    else {
        return this.mappedType;
    }
};

var extend = TypedArray.extend;
TypedArray.extend = function() {
    var SubClass = extend.apply(this, arguments);
    var MappingClass = SubClass.mapping();
    if (MappingClass) {
        SubClass.mapping(MappingClass.extend());
    }    
    return SubClass;
}

module.exports = TypedArray;
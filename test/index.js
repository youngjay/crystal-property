var Property = require('../')
var assert = require('assert');
var ko = require('knockout');

// describe('abstract', function() {
//     var p;
//     beforeEach(function() {
//         p = new Property.Abstract();
//     })

//     it('should have enabled visible activated', function() {
//         assert.equal(ko.isObservable(p.enabled), true)
//         assert.equal(ko.isObservable(p.visible), true)
//         assert.equal(ko.isObservable(p.activated), true)
//     })
// })

describe('plain', function() {
    var p;
    beforeEach(function() {
        p = new Property.Plain();
    })

    it('should get / set', function() {
        var v = '123d';
        p.set(v);
        assert.equal(p.get(), v)
    })
})

describe('number', function() {
    var p;
    beforeEach(function() {
        p = new Property.Number();
    })

    it('set null when invalid number', function() {
        var v = '123d';
        p.set(v);
        assert.equal(p.get(), null)
    })

    it('set correct when valid number', function() {
        var v = '123.12';
        p.set(v);
        assert.equal(p.get(), v)
    })
})

describe('array', function() {
    var p;
    beforeEach(function() {
        p = new Property.Array();
    })

    it('should get / set', function() {
        var v = [1,2];
        p.set(v);
        assert.deepEqual(p.get(), v)
    })

    it('reset can invoke multiple times', function() {
        var defaultValue = [1,2,3]

        p = new (Property.Array.extend({
            defaultValue: defaultValue
        }))

        p.reset();

        p.set([123])

        p.reset();

        assert.deepEqual(p.get(), defaultValue)


    })
})

describe('composite', function() {
    it('should not affect parent', function() {
        var A = Property.Composite.extend().mapping({
            a: Property.Plain
        });

        var B = A.extend().mapping({
            b: Property.Plain
        });


        var a = new A();

        assert.deepEqual(a.get(), {
            a: null
        })

        var b = new B();

        assert.deepEqual(b.get(), {
            a: null,
            b: null
        })
    })

    it('should get / set', function() {
        var v = '123d';

        var p = new (Property.Composite.extend().mapping({
            a: Property.Plain,
            b: Property.Composite.extend().mapping({
                c: Property.Plain
            })
        }))

        p.set({
            a: 2,
            b: {
                c: 3
            },
            do_not_set: 1
        })

        assert.deepEqual(p.get(), {
            a: 2,
            b: {
                c: 3
            }
        })

    })
})

describe('typed array', function() {

    it('should get / set', function() {
        var C = Property.Number.extend({
            get: function() {
                return this.value() + 1;
            }
        })

        var A = Property.TypedArray.extend().mapping(C)

        var a = new A();
        a.set([1,2])

        assert.deepEqual(a.get(), [2,3])
    })
})

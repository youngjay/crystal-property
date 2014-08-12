var Property = require('../')
var assert = require('assert');
var ko = require('knockout');
var _ = require('lodash')


describe('plain', function() {
    var p;
    beforeEach(function() {
        p = new Property.Plain();
    })

    it('should get / set', function() {
        var v = '123d';
        p.prop('value', v);
        assert.equal(p.prop('value'), v)
    });
})

describe('number', function() {
    var p;
    beforeEach(function() {
        p = new Property.Number();
    })

    it('set null when invalid number', function() {
        var v = '123d';
        p.prop('value', v);
        assert.equal(p.prop('value'), null)
    })

    it('set correct when valid number', function() {
        var v = '123.12';
        p.prop('value', v);
        assert.equal(p.prop('value'), v)
    })
})

describe('map', function() {
    it('should get / set', function() {
        var v = '123d';

        var p = new (_.extend(Property.Map.extend(), {
            a: Property.Plain,
            b: _.extend(Property.Map.extend(), {
                c: Property.Plain
            })
        }));


        p.prop('value', {
            a: 2,
            b: {
                c: 3
            },
            do_not_set: 1
        })

        assert.deepEqual(p.prop('value'), {
            a: 2,
            b: {
                c: 3
            }
        })

    })
})

describe('array', function() {

    it('should get / set', function() {
        var C = Property.Number;

        var A = _.extend(Property.Array.extend(), {
            element: C
        })

        var a = new A();
        a.prop('value', [1,2])

        assert.deepEqual(a.prop('value'), [1, 2])
    })
})

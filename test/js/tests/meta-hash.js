define(function (require, exports, module) {
    var Test  = require('tests/test'),
        meta  = require('meta');

    var test = new Test('meta.Hash'),
        Hash = meta.Hash;

    test.addCase(function(assert) {
        assert.ok( typeof Hash == 'function' );
    });

    test.addCase('default constructor', function (assert) {
        var h = new Hash();

        assert.propEqual( h.to_obj(), {} );
    });

    test.addCase('constructor with initial object', function (assert) {
        var object = {x: 100, y: 200};
        var h = new Hash(object);

        assert.propEqual( h.to_obj(), object );
    });

    test.addCase('aliases: to_obj, to_object', function (assert) {
        var h1 = new Hash(),
            h2 = new Hash({x: 100, y: 200});

        assert.propEqual( h1.to_obj(), h1.to_object() );
        assert.propEqual( h2.to_obj(), h2.to_object() );
    });

    test.addCase('add', function (assert) {
        var h = new Hash();

        h.add('key', 'value');

        assert.propEqual( h.to_obj(), {key: 'value'} );
    });

    test.addCase('add : preventing overwriting', function (assert) {
        var h = new Hash();

        h.add('key', 'first_value');
        h.add('key', 'second_value');

        assert.propEqual( h.to_obj(), {key: 'first_value'} );
    });

    test.addCase('add : explicit overwriting', function (assert) {
        var h = new Hash();

        h.add('key', 'first_value');
        h.add('key', 'second_value', true);

        assert.propEqual( h.to_obj(), {key: 'second_value'} );
    });

    test.addCase('set', function (assert) {
        var h = new Hash();

        h.add('key', 'value');

        assert.propEqual( h.to_obj(), {key: 'value'} );
    });

    test.addCase('set : overwriting', function (assert) {
        var h = new Hash();

        h.set('key', 'first_value');
        h.set('key', 'second_value');

        assert.propEqual( h.to_obj(), {key: 'second_value'} );
    });

    test.addCase('add_defaults', function (assert) {
        var h = new Hash({
            x: 1,
            y: 2
        });

        h.add_defaults({
            y: 3,
            z: 4
        });

        assert.propEqual( h.to_obj(), {x: 1, y: 2, z: 4});
    });

    test.addCase('add_defaults : explicit overwriting', function (assert) {
        var h = new Hash({
            x: 1,
            y: 2
        });

        h.add_defaults({
            y: 3,
            z: 4
        }, true);

        assert.propEqual( h.to_obj(), {x: 1, y: 3, z: 4});
    });

    test.addCase('merge', function (assert) {
        var h = new Hash({
            x: 1,
            y: 2
        });

        h.merge({
            y: 3,
            z: 4
        });

        assert.propEqual( h.to_obj(), {x: 1, y: 3, z: 4});
    });

    test.addCase('add (static method)', function (assert) {
        assert.propEqual( Hash.add({}, 'key', 'value'), {'key': 'value'} );
    });

    test.addCase('add : preventing overwriting (static method)', function (assert) {
        assert.propEqual( Hash.add({'key': 'first_value'}, 'key', 'second_value'), {'key': 'first_value'} );
    });

    test.addCase('add : explicit overwriting (static method)', function (assert) {
        assert.propEqual( Hash.add({'key': 'first_value'}, 'key', 'second_value', true), {'key': 'second_value'} );
    });

    test.addCase('set (static method)', function (assert) {
        assert.propEqual( Hash.set({}, 'key', 'value'), {'key': 'value'} );
    });

    test.addCase('set : overwriting (static method)', function (assert) {
        assert.propEqual( Hash.set({'key': 'first_value'}, 'key', 'second_value'), {'key': 'second_value'} );
    });

    test.addCase('add_defaults (static method)', function (assert) {
        var object = {
                x: 1,
                y: 2
            },
            defaults = {
                y: 3,
                z: 4
            };

        assert.propEqual( Hash.add_defaults(object, defaults), {x: 1, y: 2, z: 4} );
    });

    test.addCase('add_defaults : explicit overwriting (static method)', function (assert) {
        var object = {
                x: 1,
                y: 2
            },
            defaults = {
                y: 3,
                z: 4
            };

        assert.propEqual( Hash.add_defaults(object, defaults, true), {x: 1, y: 3, z: 4} );
    });

    test.addCase('merge (static method)', function (assert) {
        var object = {
                x: 1,
                y: 2
            },
            defaults = {
                y: 3,
                z: 4
            };

        assert.propEqual( Hash.merge(object, defaults), {x: 1, y: 3, z: 4} );
    });

    module.exports = test;
});

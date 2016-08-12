define(function (require, exports, module) {
    var Test  = require('tests/test'),
        meta  = require('meta');

    var test = new Test('meta');

    test.addCase('common', function( assert ) {
        assert.ok( typeof meta.common == 'object' );
    });

    test.addCase('common', 'first_defined', function( assert ) {
        assert.ok( typeof meta.common.first_defined == 'function' );
        assert.equal( meta.common.first_defined(), null );
        assert.equal( meta.common.first_defined(null), null );
        assert.equal( meta.common.first_defined(null, 2), null );
        assert.equal( meta.common.first_defined(1, 2), 1 );
        assert.equal( meta.common.first_defined(undefined, 2), 2 );
        assert.equal( meta.common.first_defined(undefined, undefined, 3), 3 );
        assert.equal( meta.common.first_defined(1, 2, 3), 1 );
        assert.equal( meta.common.first_defined(1, undefined, undefined), 1 );
    });

    test.addCase('common', 'has_method', function( assert ) {
        assert.ok( typeof meta.common.has_method == 'function' );
        assert.throws( meta.common.has_method() );
        assert.throws( meta.common.has_method({}) );
        assert.notOk( meta.common.has_method(1, 'method') );
        assert.ok( meta.common.has_method({method: new Function}, 'method') );
        assert.notOk( meta.common.has_method({method: new Function}, 'another_method') );
        assert.notOk( meta.common.has_method({method: new Function}, null) );
        assert.notOk( meta.common.has_method({method: 1}, 'method') );
    });

    var obj = {},
        func = new Function(),
        arr = [],
        undefined_var,
        num = 1,
        str = 'str',
        bool = false,
        nil = null;

    test.addCase('common', 'is_object', function( assert ) {
        assert.ok( meta.common.is_object(obj) );
        assert.notOk( meta.common.is_object(func) );
        assert.ok( meta.common.is_object(arr) );
        assert.notOk( meta.common.is_object(undefined_var) );
        assert.notOk( meta.common.is_object(num) );
        assert.notOk( meta.common.is_object(str) );
        assert.notOk( meta.common.is_object(bool) );
        assert.notOk( meta.common.is_object(nil) );
    });

    test.addCase('common', 'is_function', function( assert ) {
        assert.notOk( meta.common.is_function(obj) );
        assert.ok( meta.common.is_function(func) );
        assert.notOk( meta.common.is_function(arr) );
        assert.notOk( meta.common.is_function(undefined_var) );
        assert.notOk( meta.common.is_function(num) );
        assert.notOk( meta.common.is_function(str) );
        assert.notOk( meta.common.is_function(bool) );
        assert.notOk( meta.common.is_function(nil) );
    });

    test.addCase('common', 'is_array', function( assert ) {
        assert.notOk( meta.common.is_array(obj) );
        assert.notOk( meta.common.is_array(func) );
        assert.ok( meta.common.is_array(arr) );
        assert.notOk( meta.common.is_array(undefined_var) );
        assert.notOk( meta.common.is_array(num) );
        assert.notOk( meta.common.is_array(str) );
        assert.notOk( meta.common.is_array(bool) );
        assert.notOk( meta.common.is_array(nil) );
    });

    test.addCase('common', 'is_defined', function( assert ) {
        assert.ok( meta.common.is_defined(obj) );
        assert.ok( meta.common.is_defined(func) );
        assert.ok( meta.common.is_defined(arr) );
        assert.notOk( meta.common.is_defined(undefined_var) );
        assert.ok( meta.common.is_defined(num) );
        assert.ok( meta.common.is_defined(str) );
        assert.ok( meta.common.is_defined(bool) );
        assert.ok( meta.common.is_defined(nil) );
    });

    test.addCase('common', 'is_undefined', function( assert ) {
        assert.notOk( meta.common.is_undefined(obj) );
        assert.notOk( meta.common.is_undefined(func) );
        assert.notOk( meta.common.is_undefined(arr) );
        assert.ok( meta.common.is_undefined(undefined_var) );
        assert.notOk( meta.common.is_undefined(num) );
        assert.notOk( meta.common.is_undefined(str) );
        assert.notOk( meta.common.is_undefined(bool) );
        assert.notOk( meta.common.is_undefined(nil) );
    });

    test.addCase('common', 'is_number', function( assert ) {
        assert.notOk( meta.common.is_number(obj) );
        assert.notOk( meta.common.is_number(func) );
        assert.notOk( meta.common.is_number(arr) );
        assert.notOk( meta.common.is_number(undefined_var) );
        assert.ok( meta.common.is_number(num) );
        assert.notOk( meta.common.is_number(str) );
        assert.notOk( meta.common.is_number(bool) );
        assert.notOk( meta.common.is_number(nil) );
    });

    test.addCase('common', 'is_string', function( assert ) {
        assert.notOk( meta.common.is_string(obj) );
        assert.notOk( meta.common.is_string(func) );
        assert.notOk( meta.common.is_string(arr) );
        assert.notOk( meta.common.is_string(undefined_var) );
        assert.notOk( meta.common.is_string(num) );
        assert.ok( meta.common.is_string(str) );
        assert.notOk( meta.common.is_string(bool) );
        assert.notOk( meta.common.is_string(nil) );
    });

    test.addCase('common', 'is_boolean', function( assert ) {
        assert.notOk( meta.common.is_boolean(obj) );
        assert.notOk( meta.common.is_boolean(func) );
        assert.notOk( meta.common.is_boolean(arr) );
        assert.notOk( meta.common.is_boolean(undefined_var) );
        assert.notOk( meta.common.is_boolean(num) );
        assert.notOk( meta.common.is_boolean(str) );
        assert.ok( meta.common.is_boolean(bool) );
        assert.notOk( meta.common.is_boolean(nil) );
    });

    return test;
});

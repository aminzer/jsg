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

    var correctTypeDetectionResults = [
        { target: {},  belongs_to: ['defined', 'object'] },
        { target: new Function,  belongs_to: ['defined', 'function'] },
        { target: [],  belongs_to: ['defined', 'object', 'array'] },
        { target: 1,  belongs_to: ['defined', 'number'] },
        { target: 'str',  belongs_to: ['defined', 'string'] },
        { target: true,  belongs_to: ['defined', 'boolean'] },
        { target: null,  belongs_to: ['defined'] },
        { target: undefined, belongs_to: ['undefined'] }
    ];

    var typeCheckers = Object.keys(meta.common).filter(function (key) {
        return key.indexOf('is_') === 0
    });

    var mustBe, isAsExpected;
    typeCheckers.forEach(function (typeChecker) {
        test.addCase('common', typeChecker, function( assert ) {
            correctTypeDetectionResults.forEach(function (correctResult) {
                mustBe = !!~correctResult.belongs_to.indexOf(typeChecker.substr(3));
                isAsExpected = meta.common[typeChecker](correctResult.target) === mustBe;
                assert.ok(isAsExpected, isAsExpected ? 'ok' : typeErrorMessage(typeChecker, correctResult.target, mustBe));
            });
        });
    });

    function typeErrorMessage(typeChecker, target, correctResult) {
        return 'meta.common.' + typeChecker + ' must return ' + correctResult + ' for ' + (typeof target) + ' "' + target + '" '
    }

    return test;
});

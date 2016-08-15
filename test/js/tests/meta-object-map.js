define(function (require, exports, module) {
    var Test  = require('tests/test'),
        meta  = require('meta');

    var test = new Test('meta.ObjectMap');

    test.addCase(function( assert ) {
        assert.ok( typeof meta.ObjectMap == 'function' );
    });

    test.addCase('empty constructor', function( assert ) {
        var om = new meta.ObjectMap();

        assert.ok( arraysEqual(om.to_array(), []) );
        assert.equal( om.size(), 0 );
    });

    var sourceObjects = [
        {id: 1, name: 'JavaScript', interpretable: true},
        {id: 2, name: 'Java', interpretable: false},
        {id: 3, name: 'Ruby', interpretable: true},
        {id: 4, name: 'PHP', interpretable: true}
    ];
    var objectToAdd = {id: 0, name: 'Assembler', interpretable: false};

    test.addCase('constructor with predefined objects', function( assert ) {
        var om = new meta.ObjectMap({objects: sourceObjects});

        assert.ok( arraysEqual(om.to_array(), sourceObjects) );
    });

    test.addCase('base operations', function( assert ) {
        var om = new meta.ObjectMap({objects: sourceObjects});

        assert.equal( om.size(), 4 );
        assert.ok( om.contains(2) );
        assert.equal( om.get(2).name, 'Java' );
        assert.notOk( om.contains(0) );

        om.add(objectToAdd);

        assert.equal( om.size(), 5 );
        assert.ok( om.contains(2) );
        assert.ok( om.contains(0) );
        assert.equal( om.get(0).name, 'Assembler' );

        om.remove(1);

        assert.equal( om.size(), 4 );
        assert.ok( om.contains(2) );
        assert.notOk( om.contains(1) );

        assert.ok( om.get_by_index(0) );
        assert.ok( om.get_by_index(3) );
        assert.notOk( om.get_by_index(4) );
    });

    function arraysEqual(arr0, arr1) {
        if (!Array.isArray(arr0) || !Array.isArray(arr1) || arr0.length !== arr1.length) return false;
        for (var i = 0; i < arr0.length; i++) {
            if (arr0[i] !== arr1[i]) return false;
        }
        return true;
    }

    return test;
});

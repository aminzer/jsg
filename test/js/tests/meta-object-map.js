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

    test.addCase('ID field', function( assert ) {
        var om = new meta.ObjectMap({
            id_field: 'real_id',
            objects: [
                {id: 1, real_id: 2},
                {id: 2, real_id: 3}
            ]
        });

        assert.notOk( om.contains(1) );
        assert.ok( om.contains(2) );
        assert.equal( om.get(2).id, 1 );
        
        om.add({id: 3, real_id: 4});

        assert.ok( om.contains(4) );
        assert.equal( om.get(4).id, 3 );

        om.remove(2);

        assert.notOk( om.contains(2) );
        assert.ok( om.contains(3) );
    });

    test.addCase('iteration methods', function( assert ) {
        var om = new meta.ObjectMap({objects: sourceObjects});

        var aggregated = '';
        om.each(function (obj) { aggregated += obj.name; });

        assert.equal( aggregated, sourceObjects.reduce(function (res, obj) { return res + obj.name }, '') );

        assert.ok( arraysEqual(om.map(function (obj) { return obj.name }), sourceObjects.map(function (obj) { return obj.name })) );

        assert.ok( om.every(function (obj) { return obj.name.length > 2 }) );
        assert.notOk( om.every(function (obj) { return obj.name.length > 3 }) );

        assert.ok( om.some(function (obj) { return obj.name.length > 3 }) );
        assert.notOk( om.some(function (obj) { return obj.name.length > 10 }) );

        assert.equal( om.reduce(function (res, obj) { return res + obj.name }, ''), sourceObjects.reduce(function (res, obj) { return res + obj.name }, '') );
    });

    test.addCase('mirrors', function( assert ) {
        var om0 = new meta.ObjectMap();
        var om1 = new meta.ObjectMap();
        var om2 = new meta.ObjectMap();

        om0.add_mirror_for_adding(om1);
        om0.add_mirror_for_adding(om2);
        om1.add_mirror_for_adding(om0);

        om0.add({id: 4});

        assert.ok( om0.contains(4) );
        assert.ok( om1.contains(4) );
        assert.ok( om2.contains(4) );

        om1.add({id: 5});

        assert.ok( om0.contains(5) );
        assert.ok( om1.contains(5) );
        assert.ok( om2.contains(5) );

        om2.add({id: 6});

        assert.notOk( om0.contains(6) );
        assert.notOk( om1.contains(6) );
        assert.ok( om2.contains(6) );

        om0.add_mirror_for_removing(om1);
        om1.add_mirror_for_removing(om2);

        om0.remove(4);

        assert.notOk( om0.contains(4) );
        assert.notOk( om1.contains(4) );
        assert.notOk( om2.contains(4) );

        om1.remove(5);

        assert.ok( om0.contains(5) );
        assert.notOk( om1.contains(5) );
        assert.notOk( om2.contains(5) );

        om2.add_mirror_for_removing(om0);
        om1.remove(5);

        assert.notOk( om0.contains(5) );
        assert.notOk( om1.contains(5) );
        assert.notOk( om2.contains(5) );
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

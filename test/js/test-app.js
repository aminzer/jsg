require(['../../js/requirejs-config'], function () {
    
    requirejs.config({
        baseUrl: '../js/jsg',
        shim: {
            'qunit': {
                exports: 'QUnit'
            }
        },
        paths: {
            'qunit': '../../test/vendor/qunit-2.0.1'
        }
    });

    require(['qunit'], function (QUnit) {
        console.log(QUnit);

        QUnit.test( 'simple test', function( assert ) {
            assert.ok( !!'true' == true, 'Passed!' );
        });

        QUnit.load();
        QUnit.start();
    })
});

require(['../../js/requirejs-config'], function () {
    
    requirejs.config({
        baseUrl: '../js/jsg',
        shim: {
            'qunit': {
                exports: 'QUnit'
            }
        },
        paths: {
            'qunit': '../../test/vendor/qunit-2.0.1',
            'tests': '../../test/js/tests'
        }
    });

    require(['qunit', 'tests/meta-common', 'tests/meta-object-map'], function (QUnit, TestMetaCommon, TestMetaObjectMap) {
        TestMetaCommon.register();
        TestMetaObjectMap.register();

        QUnit.load();
        QUnit.start();
    })
});

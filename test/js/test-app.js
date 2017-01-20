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

    require([
        'qunit',
        'tests/meta-common',
        'tests/meta-object-map',
        'tests/meta-hash'
    ], function (QUnit, TestMetaCommon, TestMetaObjectMap, TestMetaHash) {
        TestMetaCommon.register();
        TestMetaObjectMap.register();
        TestMetaHash.register();

        QUnit.load();
        QUnit.start();
    })
});

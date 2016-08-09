requirejs.config({
    baseUrl: 'js/jsg',

    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'createjs': {
            exports: 'createjs'
        },
        'meta': {
            exports: 'meta'
        }
    },

    paths: {
        'jquery': '../../vendor/jquery-2.1.4.min',
        'createjs': '../../vendor/createjs.min',
        'meta': '../../lib/meta'
    }
});

require(['createjs', '../test'], function(createjs, test) {
    // console.log(jquery);

    // test();
    test();
    console.log(createjs.Stage)
});

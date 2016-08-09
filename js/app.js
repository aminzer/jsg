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
        'widgets': '../widgets',
        
        'jquery': '../../vendor/jquery-2.1.4.min',
        'createjs': '../../vendor/createjs.min',
        'meta': '../../lib/meta',
        'request': '../../lib/request',
        'random-access-array': '../../lib/random-access-array'
    }
});

require(['../test'], function(test) {
    test();
});

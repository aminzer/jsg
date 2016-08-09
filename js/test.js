define(function(require, exports, module) {

    var $        = require('jquery'),
        createjs = require('createjs'),
        meta     = require('meta');

    console.log($.find);
    console.log(createjs.Stage);
    console.log(meta.Class);

    module.exports = function () {
        console.log('I was loaded through requirejs!)')
    };
});

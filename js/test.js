define(function (require, exports, module) {
    var $                  = require('jquery'),
        createjs           = require('createjs'),
        meta               = require('meta'),
        Request            = require('request'),
        RandomAccessArray  = require('random-access-array'),
        Canvas             = require('widgets/canvas'),
        Menu               = require('widgets/menu'),
        end;

    console.log($.find);
    console.log(createjs.Stage);
    console.log(meta.Class);
    console.log(Request.getBasePath({some_param: 1}));
    console.log(RandomAccessArray);

    Canvas.initialize({
        width: $(document.body).width(),
        height: $(document.body).height()
    }).render({
        $parent: $(document.body)
    });

    Menu.initialize().render();
    Menu.hide();

    module.exports = function () {
        console.log('I was loaded through requirejs!)')
    };
});

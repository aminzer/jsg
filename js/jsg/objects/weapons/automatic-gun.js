define(function (require, exports, module) {
    var meta            = require('meta'),
        AutomaticWeapon = require('objects/weapons/automatic-weapon'),
        Painter         = require('util/painter');

    function AutomaticGun(opts, render) {
        opts = opts || {};
    
        AutomaticWeapon.call(this, opts);
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( AutomaticGun )
    
        .extend_from( AutomaticWeapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#555555').drawRect(-15, -2.5, this.frontLength + 15, 5)
                        .beginFill('#691C1C').drawRect(7, 0, 10, 5)
                        .beginFill('#DDDDDD').drawRect(-10, -1, this.frontLength, 2);
                });
            }
        })
    ;

    module.exports = AutomaticGun;
});

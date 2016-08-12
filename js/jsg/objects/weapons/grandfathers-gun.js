define(function (require, exports, module) {
    var meta    = require('meta'),
        Weapon  = require('objects/weapons/weapon'),
        Painter = require('util/painter');

    function GrandfathersGun(opts, render) {
        opts = opts || {};
    
        Weapon.call(this, opts);
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( GrandfathersGun )
    
        .extend_from( Weapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#444').drawRect(-15, -2.5, this.frontLength + 15, 5)
                        .beginFill('#999').drawRect(-10, -1, this.frontLength, 2);
                });
            }
        })
    ;

    module.exports = GrandfathersGun;
});

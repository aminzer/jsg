define(function (require, exports, module) {
    var meta         = require('meta'),
        WEAPON       = require('const/physics/weapon'),
        MineDelivery = require('objects/weapons/bullets/mine-delivery'),
        Weapon       = require('objects/weapons/weapon'),
        Painter      = require('util/painter');

    function Mortar(opts, render) {
        opts = new meta.Hash(opts).add_defaults({
            maxSector: WEAPON.ROCKET_LAUNCHER.MAX_SECTOR,
            frontLength: WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH,
            hardness: WEAPON.ROCKET_LAUNCHER.HARDNESS,
            shootingDelay: WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY
        }).to_obj();
    
        Weapon.call(this, opts);
    
        this.charger.bulletConstructor = MineDelivery;
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( Mortar )
    
        .extend_from( Weapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#306337')
                        .drawRoundRect(-30, -5, this.frontLength + 30, 10, 5)
    
                        .beginFill('#B0BA3C')
                        .drawRect(23, -6, 8, 12)
                        .drawRect(-27, -2, 12, 4)
                })
            }
        })
    ;

    module.exports = Mortar;
});

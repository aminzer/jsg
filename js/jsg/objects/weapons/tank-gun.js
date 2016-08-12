define(function (require, exports, module) {
    var meta            = require('meta'),
        WEAPON          = require('const/physics/weapon'),
        ExplosiveRocket = require('objects/weapons/bullets/explosive-rocket'),
        Weapon          = require('objects/weapons/weapon'),
        Painter         = require('util/painter');

    function TankGun(opts, render) {
        opts = new meta.Hash(opts).merge({
            maxSector: WEAPON.TANK_GUN.MAX_SECTOR,
            frontLength: WEAPON.TANK_GUN.FRONT_LENGTH,
            hardness: WEAPON.TANK_GUN.HARDNESS,
            shootingDelay: WEAPON.TANK_GUN.SHOOTING_DELAY,
            offsetX: 20,
            offsetY: 0
        }).to_obj();
    
        Weapon.call(this, opts);
    
        this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( TankGun )
    
        .extend_from( Weapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#381D11').drawRect(-30, -7, this.frontLength + 30, 14)
                        .beginFill('#27130D').drawRoundRect(-35, -25, 70, 50, 15)
                        .beginFill('#27130D').drawRoundRect(this.frontLength - 5, -8, 10, 16, 2)
                });
            }
        })
    ;

    module.exports = TankGun;
});

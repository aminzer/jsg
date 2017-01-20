define(function (require, exports, module) {
    var meta            = require('meta'),
        WEAPON          = require('const/physics/weapon'),
        ExplosiveRocket = require('objects/weapons/bullets/explosive-rocket'),
        Weapon          = require('objects/weapons/weapon'),
        Painter         = require('util/painter');

    function RocketLauncher(opts, render) {
        opts = new meta.Hash(opts).add_defaults({
            maxSector: WEAPON.ROCKET_LAUNCHER.MAX_SECTOR,
            frontLength: WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH,
            hardness: WEAPON.ROCKET_LAUNCHER.HARDNESS,
            shootingDelay: WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY
        }).to_obj();
    
        Weapon.call(this, opts);
    
        this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( RocketLauncher )
    
        .extend_from( Weapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#244482')
                        .drawRect(-30, -4, this.frontLength + 30, 8)
    
                        .beginFill('#bbb')
                        .drawRect(21, -5, 8, 10)
                        .drawRect(-27, -2, 12, 4);
                });
            }
        })
    ;

    module.exports = RocketLauncher;
});

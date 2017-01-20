define(function (require, exports, module) {
    var meta             = require('meta'),
        WEAPON           = require('const/physics/weapon'),
        AutomaticWeapon  = require('objects/weapons/automatic-weapon'),
        MachineGunBullet = require('objects/weapons/bullets/machine-gun-bullet'),
        Painter          = require('util/painter');

    function MachineGun(opts, render) {
        opts = new meta.Hash(opts).add_defaults({
            maxSector: WEAPON.MACHINE_GUN.MAX_SECTOR,
            frontLength: WEAPON.MACHINE_GUN.FRONT_LENGTH,
            hardness: WEAPON.MACHINE_GUN.HARDNESS,
            rateOfFire: WEAPON.MACHINE_GUN.RATE_OF_FIRE
        }).to_obj();
    
        AutomaticWeapon.call(this, opts);
    
        this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, MachineGunBullet );
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( MachineGun )
    
        .extend_from( AutomaticWeapon )
    
        .define_method({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#8A8A8A')
                        .drawRect(-20, -2, this.frontLength + 20, 4)
    
                        .beginFill('#444')
                        .drawRect(-10, -4, 20, 10)
                        .drawRect(-20, -4, 7, 8)
    
                        .beginFill('#222')
                        .drawRect(30, -2, 10, 4)
                });
            }
        })
    ;

    module.exports = MachineGun;
});

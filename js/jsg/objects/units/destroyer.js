define(function (require, exports, module) {
    var meta            = require('meta'),
        UNIT            = require('const/physics/unit'),
        CircleUnit      = require('objects/units/circle-unit'),
        CompositeWeapon = require('objects/weapons/composite-weapon'),
        MachineGun      = require('objects/weapons/machine-gun'),
        RocketLauncher  = require('objects/weapons/rocket-launcher'),
        WeaponSet       = require('objects/weapons/weapon-set'),
        Painter         = require('util/painter');

    function Destroyer(opts, render) {
        opts = new meta.Hash( opts ).merge({
            radius: UNIT.DESTROYER.RADIUS,
            maxHp: UNIT.DESTROYER.HP,
            weaponSet: WeaponSet.oneGun(new CompositeWeapon({
                weaponConstructors: [MachineGun, MachineGun, RocketLauncher],
                offsetsY: [-22, -9, 19],
                offsetsX: [-1, 2, 0]
            }, false))
        }).to_obj();
    
        CircleUnit.call(this, opts);
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( Destroyer )
    
        .extend_from( CircleUnit )
    
        .define_methods({
            render: function () {            
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#c22')
                        .drawCircle(0, 0, this.radius)
                        
                        .beginFill('#fd1')
                        .drawRect(-5, -this.radius + 1, 10, 2 * (this.radius - 1))
                        .drawRect(-13, 1, 26, 8)
                });
    
                if (this.weapon != null) {
                    this.weapon.render();
                }
            }
        })
    ;

    module.exports = Destroyer;
});

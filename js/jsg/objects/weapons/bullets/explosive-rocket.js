define(function (require, exports, module) {
    var meta               = require('meta'),
        BULLET             = require('const/physics/bullet'),
        AcceleratingBullet = require('objects/weapons/bullets/accelerating-bullet'),
        ExplosiveBullet    = require('objects/weapons/bullets/explosive-bullet'),
        Rocket             = require('objects/weapons/bullets/rocket'),
        Fraction           = require('objects/weapons/bullets/fraction'),
        M                  = require('math-util');

    function ExplosiveRocket(opts, render) {
        opts = new meta.Hash(opts).merge({
            damage: BULLET.EXPLOSIVE_ROCKET.DAMAGE,
            speed: BULLET.EXPLOSIVE_ROCKET.START_SPEED,
            lifetime: BULLET.EXPLOSIVE_ROCKET.LIFETIME,

            childBulletConstructor: Fraction,
            childCount: BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT,
            sector: 360
        }).to_obj();

        ExplosiveBullet.call(this, opts, false);
        Rocket.call(this, opts, render);
    }

    new meta.Class( ExplosiveRocket )

        .extend_from( ExplosiveBullet )

        .add_mixins([ AcceleratingBullet, Rocket ])

        .define_methods({
            getChildBulletOpts: function (angle) {
                return {
                    x: this.x - 30 * M.cos_d(this.angle),   // rocket explode in it's tail
                    y: this.y - 30 * M.sin_d(this.angle),
                    angle: angle,
                    damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
                    speed: 10 + Math.random() * 5,
                    lifetime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME
                }
            }
        })
    ;

    module.exports = ExplosiveRocket;
});

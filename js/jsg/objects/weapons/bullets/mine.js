define(function (require, exports, module) {
    var meta            = require('meta'),
        BULLET          = require('const/physics/bullet'),
        ExplosiveBullet = require('objects/weapons/bullets/explosive-bullet'),
        Fraction        = require('objects/weapons/bullets/fraction'),
        Painter         = require('util/painter');

    function Mine(opts, render) {
        opts = new meta.Hash(opts).merge({
            speed: 0,
            childBulletConstructor: Fraction,
            childCount: BULLET.MINE.FRACTION_COUNT,
            sector: 360
        }).to_obj();

        ExplosiveBullet.call(this, opts, render);
    }

    new meta.Class( Mine )

        .extend_from( ExplosiveBullet )

        .define_methods({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#588DAD').drawCircle(0, 0, 6)
                        .beginFill('#f00').drawCircle(0, 0, 3);
                });
            },

            getChildBulletOpts: function (angle) {
                return {
                    x: this.x + 10 * cos_d(angle),
                    y: this.y + 10 * sin_d(angle),
                    angle: angle,
                    damage: BULLET.MINE.FRACTION_DAMAGE,
                    speed: 10 + random() * 5,
                    lifetime: BULLET.MINE.FRACTION_LIFETIME
                }
            },

            reduceLifetime: function () {
                return 1;
            }
        })
    ;

    module.exports = Mine;
});

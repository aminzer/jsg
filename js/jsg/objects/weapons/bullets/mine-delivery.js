define(function (require, exports, module) {
    var meta               = require('meta'),
        BULLET             = require('const/physics/bullet'),
        AcceleratingBullet = require('objects/weapons/bullets/accelerating-bullet'),
        Mine               = require('objects/weapons/bullets/mine'),
        Painter            = require('util/painter'),
        gctx               = require('game-context').instance();

    function MineDelivery(opts, render) {
        opts = new meta.Hash(opts).merge({
            damage: BULLET.MINE_DELIVERY.DAMAGE,
            speed: BULLET.MINE_DELIVERY.START_SPEED,
            lifetime: BULLET.MINE_DELIVERY.LIFETIME,
            acceleration: BULLET.MINE_DELIVERY.ACCELERATION,
            beginAccelerationLifetime: BULLET.MINE_DELIVERY.BEGIN_ACCELERATION_LIFETIME,
            endAccelerationLifetime: BULLET.MINE_DELIVERY.END_ACCELERATION_LIFETIME
        }).to_obj();

        AcceleratingBullet.call(this, opts, render);
    }

    new meta.Class( MineDelivery )

        .extend_from( AcceleratingBullet )

        .define_methods({
            render: function () {
                Painter.circle(this, 4, '#588DAD');
            },

            afterDie: function () {
                gctx.bullets.add(new Mine({
                    x: this.x,
                    y: this.y
                }));
            }
        })
    ;

    module.exports = MineDelivery;
});

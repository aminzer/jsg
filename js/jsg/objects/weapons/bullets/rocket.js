define(function (require, exports, module) {
    var meta               = require('meta'),
        BULLET             = require('const/physics/bullet'),
        AcceleratingBullet = require('objects/weapons/bullets/accelerating-bullet'),
        Painter            = require('util/painter');

    function Rocket(opts, render) {
        opts = new meta.Hash(opts).add_defaults({
            damage: BULLET.ROCKET.DAMAGE,
            speed: BULLET.ROCKET.START_SPEED,
            lifetime: BULLET.ROCKET.LIFETIME,
            acceleration: BULLET.ROCKET.ACCELERATION,
            beginAccelerationLifetime: BULLET.ROCKET.BEGIN_ACCELERATION_LIFETIME,
            endAccelerationLifetime: BULLET.ROCKET.END_ACCELERATION_LIFETIME
        }).to_obj();

        AcceleratingBullet.call(this, opts, render);
    }

    new meta.Class( Rocket )

        .extend_from( AcceleratingBullet )

        .define_methods({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#999')
                        .drawRect(-40, -3, 40, 6)

                        .beginFill('#333')
                        .drawRoundRect(-20, -4, 20, 8, 3)

                        .beginFill('#f00')
                        .drawRect(-40, -4, 2, 8)
                        .drawRect(-6, -4, 2, 8)
                        .drawRect(-13, -4, 2, 8)
                });
            }
        })
    ;

    module.exports = Rocket;
});

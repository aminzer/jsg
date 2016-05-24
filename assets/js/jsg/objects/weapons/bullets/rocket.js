function Rocket(opts, render) {
    opts = new meta.Hash(opts).merge({
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
            Painter.rectangle(this, 40, 6, 40, 3, "#999");
            Painter.roundRectangle(this, 20, 8, 20, 4, 3, "#333");
            Painter.rectangle(this, 2, 8, 40, 4, "#f00");
            Painter.rectangle(this, 2, 8, 6, 4, "#f00");
            Painter.rectangle(this, 2, 8, 13, 4, "#f00");
        }
    })
;

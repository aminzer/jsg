function Rocket(opts, render) {
    opts = opts || {};

    AcceleratingBullet.call(this, opts, render);

    // TODO use Hash.merge and pass params to parent constructor instead of setters
    this.damage = meta.common.first_defined( opts.damage, BULLET.ROCKET.DAMAGE );
    this.speed = meta.common.first_defined( opts.speed, BULLET.ROCKET.START_SPEED );
    this.lifetime = meta.common.first_defined( opts.lifetime, BULLET.ROCKET.LIFETIME );

    this.acceleration = meta.common.first_defined( opts.acceleration || BULLET.ROCKET.ACCELERATION);
    this.beginAccelerationLifetime = meta.common.first_defined( opts.beginAccelerationLifetime || BULLET.ROCKET.BEGIN_ACCELERATION_LIFETIME);
    this.endAccelerationLifetime = meta.common.first_defined( opts.endAccelerationLifetime || BULLET.ROCKET.END_ACCELERATION_LIFETIME);
}

meta.Class( Rocket )

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

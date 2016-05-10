function MineDelivery(opts, render) {
    opts = opts || {};

    AcceleratingBullet.call(this, opts, render);

    this.damage = meta.common.first_defined( opts.damage, BULLET.MINE_DELIVERY.DAMAGE );
    this.speed = meta.common.first_defined( opts.speed, BULLET.MINE_DELIVERY.START_SPEED );
    this.lifetime = meta.common.first_defined( opts.lifetime, BULLET.MINE_DELIVERY.LIFETIME );

    this.acceleration = meta.common.first_defined( opts.acceleration || BULLET.MINE_DELIVERY.ACCELERATION);
    this.beginAccelerationLifetime = meta.common.first_defined( opts.beginAccelerationLifetime || BULLET.MINE_DELIVERY.BEGIN_ACCELERATION_LIFETIME);
    this.endAccelerationLifetime = meta.common.first_defined( opts.endAccelerationLifetime || BULLET.MINE_DELIVERY.END_ACCELERATION_LIFETIME);
}

meta.Class( MineDelivery )

    .extend_from( AcceleratingBullet )

    .define_methods({
        render: function () {
            Painter.circle(this, 4, "#588DAD");
        },

        die: function () {
            _.bullets().push(new Mine({
                x: this.x,
                y: this.y
            }));
        }
    })
;

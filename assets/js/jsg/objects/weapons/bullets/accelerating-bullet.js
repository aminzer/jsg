function AcceleratingBullet(opts, render) {
    opts = opts || {};

    this._acceleration = meta.common.first_defined( opts.acceleration, BULLET.DEFAULT.ACCELERATION);
    this._beginAccelerationLifetime = meta.common.first_defined( opts.beginAccelerationLifetime, BULLET.DEFAULT.BEGIN_ACCELERATION_LIFETIME);
    this._endAccelerationLifetime = meta.common.first_defined( opts.endAccelerationLifetime, BULLET.DEFAULT.END_ACCELERATION_LIFETIME);

    Bullet.call(this, opts, render);
}

meta.Class( AcceleratingBullet )
    
    .extend_from( Bullet )

    .define_accessors([
        'acceleration',
        'beginAccelerationLifetime',
        'endAccelerationLifetime'
    ])

    .define_methods({
        move: function () {
            this.moveX(this.speed * cos_d(this.angle));
            this.moveY(this.speed * sin_d(this.angle));
            this.reduceLifetime();

            if (this.lifetime < this._beginAccelerationLifetime && this.lifetime > this._endAccelerationLifetime) {
                this.increaseSpeed(this._acceleration);
            }

            return this.lifetime > 0;
        }
    })
;

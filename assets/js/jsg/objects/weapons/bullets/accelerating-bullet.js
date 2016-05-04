function AcceleratingBullet(opts, render) {
    opts = opts || {};
    
    this._acceleration = meta.common.first_defined( opts.acceleration || BULLET.DEFAULT.ACCELERATION);
    this._beginAccelerationLifetime = meta.common.first_defined( opts.beginAccelerationLifetime || BULLET.DEFAULT.BEGIN_ACCELERATION_LIFETIME);
    this._endAccelerationLifetime = meta.common.first_defined( opts.endAccelerationLifetime || BULLET.DEFAULT.END_ACCELERATION_LIFETIME);

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
            this.moveX(this.getSpeed() * cos_d(this.getAngle()));
            this.moveY(this.getSpeed() * sin_d(this.getAngle()));
            this.reduceLifetime();

            if (this.getLifetime() < this._beginAccelerationLifetime && this.getLifetime() > this._endAccelerationLifetime) {
                this.increaseSpeed(this._acceleration);
            }

            return this.getLifetime() > 0;
        }
    })
;

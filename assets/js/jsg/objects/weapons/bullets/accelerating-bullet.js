function AcceleratingBullet(opts, render) {
    opts = opts || {};
    
    Bullet.call(this, opts, false);
    
    this._acceleration = meta.common.first_defined( opts.acceleration || BULLET.DEFAULT.ACCELERATION);
    this._beginAccelerationLifetime = meta.common.first_defined( opts.beginAccelerationLifetime || BULLET.DEFAULT.BEGIN_ACCELERATION_LIFETIME);
    this._endAccelerationLifetime = meta.common.first_defined( opts.endAccelerationLifetime || BULLET.DEFAULT.END_ACCELERATION_LIFETIME);

    if (render !== false) {
        this.render();
    }
}

Extend(AcceleratingBullet).from(Bullet);

AcceleratingBullet.prototype.move = function() {
    this.moveX(this.getSpeed() * cos_d(this.getAngle()));
    this.moveY(this.getSpeed() * sin_d(this.getAngle()));
    this.reduceLifetime();

    if (this.getLifetime() < this._beginAccelerationLifetime && this.getLifetime() > this._endAccelerationLifetime) {
        this.increaseSpeed(this._acceleration);
    }

    return this.getLifetime() > 0;
};

AcceleratingBullet.prototype.getAcceleration = function() {
    return this._acceleration;
};

AcceleratingBullet.prototype.setAcceleration = function(acceleration) {
    this._acceleration = acceleration;
};

AcceleratingBullet.prototype.getBeginAccelerationLifetime = function() {
    return this._beginAccelerationLifetime;
};

AcceleratingBullet.prototype.setBeginAccelerationLifetime = function(beginAccelerationLifetime) {
    this._beginAccelerationLifetime = beginAccelerationLifetime;
};

AcceleratingBullet.prototype.getEndAccelerationLifetime = function() {
    return this._endAccelerationLifetime;
};

AcceleratingBullet.prototype.setEndAccelerationLifetime = function(endAccelerationLifetime) {
    this._endAccelerationLifetime = endAccelerationLifetime;
};

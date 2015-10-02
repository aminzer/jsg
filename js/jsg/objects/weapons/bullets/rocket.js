function Rocket(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this._acceleration = this.def( opts.acceleration || BULLET.ROCKET.ACCELERATION);
    this._beginAccelerationLifetime = this.def( opts.beginAccelerationLifetime || BULLET.ROCKET.BEGIN_ACCELERATION_LIFETIME);
    this._endAccelerationLifetime = this.def( opts.endAccelerationLifetime || BULLET.ROCKET.END_ACCELERATION_LIFETIME);

    this.setDamage(this.def( opts.damage, BULLET.ROCKET.DAMAGE ));
    this.setSpeed(this.def( opts.speed, BULLET.ROCKET.START_SPEED ));
    this.setLifetime(this.def( opts.lifetime, BULLET.ROCKET.LIFETIME ));
    
    if (render !== false) {
        this.render();
    }
}

Extend(Rocket).from(Bullet);

Rocket.prototype.render = function() {
    Painter.rectangle(this, 40, 6, 40, 3, "#999");
    Painter.roundRectangle(this, 20, 8, 20, 4, 3, "#333");
    Painter.rectangle(this, 2, 8, 40, 4, "#f00");
    Painter.rectangle(this, 2, 8, 6, 4, "#f00");
    Painter.rectangle(this, 2, 8, 13, 4, "#f00");
};

Rocket.prototype.move = function() {
    this.moveX(this.getSpeed() * cos_d(this.getAngle()));
    this.moveY(this.getSpeed() * sin_d(this.getAngle()));
    this.reduceLifetime();

    if (this.getLifetime() < this._beginAccelerationLifetime && this.getLifetime() > this._endAccelerationLifetime) {
        this.increaseSpeed(this._acceleration);
    }

    return this.getLifetime() > 0;
};

Rocket.prototype.getAcceleration = function() {
    return this._acceleration;
};

Rocket.prototype.setAcceleration = function(acceleration) {
    this._acceleration = acceleration;
};

Rocket.prototype.getStartAccelerationLifetime = function() {
    return this._startAccelerationLifetime;
};

Rocket.prototype.setStartAccelerationLifetime = function(startAccelerationLifetime) {
    this._startAccelerationLifetime = startAccelerationLifetime;
};

Rocket.prototype.getEndAccelerationLifetime = function() {
    return this._endAccelerationLifetime;
};

Rocket.prototype.setEndAccelerationLifetime = function(endAccelerationLifetime) {
    this._endAccelerationLifetime = endAccelerationLifetime;
};

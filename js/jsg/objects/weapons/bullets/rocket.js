function Rocket(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);
        
    this.setDamage(opts.damage || BULLET.ROCKET.DAMAGE);
    this.setSpeed(opts.speed || BULLET.ROCKET.START_SPEED);
    this.setLifetime(opts.lifetime || BULLET.ROCKET.LIFETIME);
    
    if (render !== false) {
        this.render();
    }
}

Rocket.prototype = Object.create(Bullet.prototype);

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

    if (this.getLifetime() < BULLET.ROCKET.START_ACCELERATION_LIFETIME && this.getLifetime() > BULLET.ROCKET.END_ACCELERATION_LIFETIME) {
        this.increaseSpeed(BULLET.ROCKET.ACCELERATION);
    }

    return this.getLifetime() > 0;
};

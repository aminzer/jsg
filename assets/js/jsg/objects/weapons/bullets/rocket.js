function Rocket(opts, render) {
    opts = opts || {};

    AcceleratingBullet.call(this, opts, false);

    this.setDamage(this.def( opts.damage, BULLET.ROCKET.DAMAGE ));
    this.setSpeed(this.def( opts.speed, BULLET.ROCKET.START_SPEED ));
    this.setLifetime(this.def( opts.lifetime, BULLET.ROCKET.LIFETIME ));

    this.setAcceleration(this.def( opts.acceleration || BULLET.ROCKET.ACCELERATION));
    this.setBeginAccelerationLifetime(this.def( opts.beginAccelerationLifetime || BULLET.ROCKET.BEGIN_ACCELERATION_LIFETIME));
    this.setEndAccelerationLifetime(this.def( opts.endAccelerationLifetime || BULLET.ROCKET.END_ACCELERATION_LIFETIME));

    if (render !== false) {
        this.render();
    }
}

Extend(Rocket).from(AcceleratingBullet);

Rocket.prototype.render = function() {
    Painter.rectangle(this, 40, 6, 40, 3, "#999");
    Painter.roundRectangle(this, 20, 8, 20, 4, 3, "#333");
    Painter.rectangle(this, 2, 8, 40, 4, "#f00");
    Painter.rectangle(this, 2, 8, 6, 4, "#f00");
    Painter.rectangle(this, 2, 8, 13, 4, "#f00");
};

function Mine(opts, render) {
    opts = opts || {};

    ExplosiveRocket.call(this, opts, false);

    this.setLifetime(50);
    this.setSpeed(24);
    this.setAcceleration(-0.6);
    this.setBeginAccelerationLifetime(40);
    this.setEndAccelerationLifetime(0);

    if (render !== false) {
        this.render();
    }
}

Extend(Mine).from(ExplosiveRocket);

Mine.prototype.render = function() {
    Painter.circle(this, 5, "#588DAD");
    Painter.circle(this, 2, "#f00");
};

Mine.prototype.reduceLifetime = function() {
    if (this.getLifetime() === 1) {
        this.setSpeed(0);
        this.setAcceleration(0);
        return this.getLifetime();
    }
    return --this._lifetime;
};

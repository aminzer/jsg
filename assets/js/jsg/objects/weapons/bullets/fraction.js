function Fraction(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this.setDamage(this.def( opts.damage, BULLET.DEFAULT.DAMAGE ));
    this.setSpeed(this.def( opts.speed, BULLET.DEFAULT.SPEED ));
    this.setLifetime(this.def( opts.lifetime, BULLET.DEFAULT.LIFETIME ));

    if (render !== false) {
        this.render();
    }
}

Extend(Fraction).from(Bullet);

Fraction.prototype.render = function() {
    Painter.rectangle(this, 3, 3, 1.5, 1.5, "#f00");
};

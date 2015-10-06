function Mine(opts, render) {
    opts = opts || {};

    ExplosiveBullet.call(this, opts, false);

    this.setSpeed(0);
    this.setChildBulletConstructor(this.def( opts.childBulletConstructor, Fraction ));
    this.setChildCount(this.def( opts.childCount, BULLET.MINE.FRACTION_COUNT ));
    this.setSector(this.def (opts.sector, 360));

    if (render !== false) {
        this.render();
    }
}

Extend(Mine).from(ExplosiveBullet);

Mine.prototype.render = function() {
    Painter.circle(this, 6, "#588DAD");
    Painter.circle(this, 3, "#f00");
};

Mine.prototype.getChildBulletOpts = function(angle) {
    return {
        x: this.getX() + 10 * cos_d(angle),
        y: this.getY() + 10 * sin_d(angle),
        angle: angle,
        damage: BULLET.MINE.FRACTION_DAMAGE,
        speed: 10 + random() * 5,
        lifetime: BULLET.MINE.FRACTION_LIFETIME
    }
};

Mine.prototype.reduceLifetime = function() {
    return 1;
};

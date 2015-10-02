function ExplosiveRocket(opts, render) {
    opts = opts || {};

    ExplosiveBullet.call(this, opts, render);

    this.setDamage(this.def( opts.damage, BULLET.EXPLOSIVE_ROCKET.DAMAGE ));
    this.setSpeed(this.def( opts.speed, BULLET.EXPLOSIVE_ROCKET.START_SPEED ));
    this.setLifetime(this.def( opts.lifetime, BULLET.EXPLOSIVE_ROCKET.LIFETIME ));
    this.setChildBulletConstructor(this.def( opts.childBulletConstructor, Fraction ));
    this.setChildCount(this.def( opts.childCount, BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT ));
    this.setSector(this.def (opts.sector, 360));

    if (render !== false) {
        this.render();
    }
}

Extend(ExplosiveRocket).from(ExplosiveBullet).withMixins(Rocket);

ExplosiveRocket.prototype.getChildBulletOpts = function() {
    return {
        x: this.getX() - 30 * cos_d(this.getAngle()),   // rocket explode in it's tail
        y: this.getY() - 30 * sin_d(this.getAngle()),
        damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
        speed: 10 + random() * 5,
        lifetime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME,
        explosionCount: 2
    }
};

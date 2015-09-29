function ExplosiveRocket(opts, render) {
    opts = opts || {};

    Rocket.call(this, opts, render);

    this.setDamage(opts.damage || BULLET.EXPLOSIVE_ROCKET.DAMAGE);
    this.setSpeed(opts.speed || BULLET.EXPLOSIVE_ROCKET.START_SPEED);
    this.setLifetime(opts.lifetime || BULLET.EXPLOSIVE_ROCKET.LIFETIME);
}

ExplosiveRocket.prototype = Object.create(Rocket.prototype);

ExplosiveRocket.prototype.destroy = function() {
    for (var angle = 0; angle < 360; angle += 360 / BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT) {
        gctx.addBullet(new Fraction({
            x: this.getX() - 30 * cos_d(this.getAngle()),   // rocket explode in it's tail
            y: this.getY() - 30 * sin_d(this.getAngle()),
            angle: angle,
            damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
            speed: 10 + random() * 5,
            lifeTime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME
        }));
    }
};

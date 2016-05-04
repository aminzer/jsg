function ExplosiveRocket(opts, render) {
    opts = opts || {};

    ExplosiveBullet.call(this, opts, false);
    Rocket.call(this, opts, render);

    this.setDamage(meta.common.first_defined( opts.damage, BULLET.EXPLOSIVE_ROCKET.DAMAGE ));
    this.setSpeed(meta.common.first_defined( opts.speed, BULLET.EXPLOSIVE_ROCKET.START_SPEED ));
    this.setLifetime(meta.common.first_defined( opts.lifetime, BULLET.EXPLOSIVE_ROCKET.LIFETIME ));
    this.setChildBulletConstructor(meta.common.first_defined( opts.childBulletConstructor, Fraction ));
    this.setChildCount(meta.common.first_defined( opts.childCount, BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT ));
    this.setSector(meta.common.first_defined (opts.sector, 360));
}

meta.Class( ExplosiveRocket )

    .extend_from( ExplosiveBullet )

    .add_mixins([ AcceleratingBullet, Rocket ])

    .define_methods({
        getChildBulletOpts: function (angle) {
            return {
                x: this.getX() - 30 * cos_d(this.getAngle()),   // rocket explode in it's tail
                y: this.getY() - 30 * sin_d(this.getAngle()),
                angle: angle,
                damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifetime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME
            }
        }
    })
;

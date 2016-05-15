function ExplosiveRocket(opts, render) {
    opts = new meta.Hash(opts).merge({
        damage: BULLET.EXPLOSIVE_ROCKET.DAMAGE,
        speed: BULLET.EXPLOSIVE_ROCKET.START_SPEED,
        lifetime: BULLET.EXPLOSIVE_ROCKET.LIFETIME,

        childBulletConstructor: Fraction,
        childCount: BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT,
        sector: 360
    }).to_obj();

    ExplosiveBullet.call(this, opts, false);
    Rocket.call(this, opts, render);
}

meta.Class( ExplosiveRocket )

    .extend_from( ExplosiveBullet )

    .add_mixins([ AcceleratingBullet, Rocket ])

    .define_methods({
        getChildBulletOpts: function (angle) {
            return {
                x: this.x - 30 * cos_d(this.angle),   // rocket explode in it's tail
                y: this.y - 30 * sin_d(this.angle),
                angle: angle,
                damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifetime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME
            }
        }
    })
;

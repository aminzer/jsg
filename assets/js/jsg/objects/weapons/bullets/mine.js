function Mine(opts, render) {
    opts = new meta.Hash(opts).merge({
        speed: 0,
        childBulletConstructor: Fraction,
        childCount: BULLET.MINE.FRACTION_COUNT,
        sector: 360
    }).to_obj();

    ExplosiveBullet.call(this, opts, render);
}

meta.Class( Mine )

    .extend_from( ExplosiveBullet )

    .define_methods({
        render: function () {
            Painter.circle(this, 6, "#588DAD");
            Painter.circle(this, 3, "#f00");
        },

        getChildBulletOpts: function (angle) {
            return {
                x: this.x + 10 * cos_d(angle),
                y: this.y + 10 * sin_d(angle),
                angle: angle,
                damage: BULLET.MINE.FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifetime: BULLET.MINE.FRACTION_LIFETIME
            }
        },

        reduceLifetime: function () {
            return 1;
        }
    })
;

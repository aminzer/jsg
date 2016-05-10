function Mine(opts, render) {
    opts = opts || {};

    ExplosiveBullet.call(this, opts, render);

    this.speed = 0;
    this.childCount = meta.common.first_defined( opts.childCount, BULLET.MINE.FRACTION_COUNT );
    this.sector = meta.common.first_defined (opts.sector, 360);
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

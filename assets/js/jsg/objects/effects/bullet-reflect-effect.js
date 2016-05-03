function BulletReflectEffect(opts, render) {
    opts = meta.Hash( opts ).merge({
        radius: 100
    }).get_hash();

    CircleObject.call(this, opts);
    Effect.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( BulletReflectEffect )

    .extend_from( Effect )

    .add_mixin( CircleObject )

    .define_methods({
        render: function () {
            Painter.circle(this, this.getRadius(), "rgba(0, 100, 0, 0.2)");
        },

        makeInfluence: function () {
            _.bullets().forEach(function (bullet) {
                if (this.isPointInside(bullet.getX(), bullet.getY())) {
                    var normalAngle = MathUtility.getLinesAngle(bullet.getX(), bullet.getY(), this.getX(), this.getY());
                    bullet.setAngle(180 - bullet.getAngle() + 2 * normalAngle);
                    bullet.move();
                }
            }, this);
        }
    })
;

function WindEffect(opts, render) {
    opts = meta.Hash( opts ).merge({
        radius: 100
    }).get_hash();

    CircleObject.call(this, opts);
    Effect.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( WindEffect )

    .extend_from( Effect )

    .add_mixin( CircleObject )

    .define_methods({
        render: function () {
            var radius = this.radius;

            Painter.circle(this, rad(1), "rgba(0, 50, 255, 0.2)");
            Painter.rectangle(this, rad(7/6), 2, rad(1/3), 1, "rgba(0, 50, 255, 0.1)");
            Painter.rectangle(this, rad(1/2), 2, -rad(0.17), rad(1/2), "rgba(0, 50, 255, 0.1)");
            Painter.rectangle(this, rad(1/2), 2, -rad(0.17), -rad(1/2), "rgba(0, 50, 255, 0.1)");
            Painter.rectangle(this, rad(5/6), 2, rad(0.05), rad(1/4), "rgba(0, 50, 255, 0.1)");
            Painter.rectangle(this, rad(5/6), 2, rad(0.05), -rad(1/4), "rgba(0, 50, 255, 0.1)");

            function rad(scale) {
                return radius * scale;
            }
        },

        makeInfluence: function () {
            _.bullets().forEach(function(bullet) {
                if (this.isPointInside(bullet.x, bullet.y)) {
                    var delta = 5;
                    if (Math.abs( MathUtility.normalizeAngle(bullet.angle - this.angle) ) < delta) {
                        bullet.angle = this.angle;
                    } else {
                        if (!MathUtility.isClockwiseDirection(bullet.angle, this.angle)) {
                            delta = -delta;
                        }
                        bullet.angle += delta;
                    }
                }
            }, this);
        }
    })
;

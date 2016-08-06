function WindEffect(opts, render) {
    opts = new meta.Hash( opts ).merge({
        radius: 100
    }).to_obj();

    CircleObject.call(this, opts);
    Effect.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

new meta.Class( WindEffect )

    .extend_from( Effect )

    .add_mixin( CircleObject )

    .define_methods({
        render: function () {
            var rad = function (scale) { return this.radius * scale }.bind(this);

            Painter.shape(this, function (shape) {
                shape.graphics
                    .beginFill('rgba(0,50,255,0.2)')
                    .drawCircle(0, 0, rad(1))

                    .beginFill('rgba(0, 50, 255, 0.1)')
                    .drawRect(-rad(1/3), -1, rad(7/6), 2)
                    .drawRect(rad(0.17), -rad(1/2), rad(1/2), 2)
                    .drawRect(rad(0.17), rad(1/2), rad(1/2), 2)
                    .drawRect(-rad(0.05), -rad(1/4), rad(5/6), 2)
                    .drawRect(-rad(0.05), rad(1/4), rad(5/6), 2)
            });
        },

        makeInfluence: function () {
            gctx.bullets.each(function (bullet) {
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

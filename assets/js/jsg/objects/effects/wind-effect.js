function WindEffect(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        radius: 100
    });

    CircleObject.call(this, opts);
    Effect.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(WindEffect).from(Effect).withMixins(CircleObject);

WindEffect.prototype.render = function() {
    var radius = this.getRadius();

    Painter.circle(this, rad(1), "rgba(0, 50, 255, 0.2)");
    Painter.rectangle(this, rad(7/6), 2, rad(1/3), 1, "rgba(0, 50, 255, 0.1)");
    Painter.rectangle(this, rad(1/2), 2, -rad(0.17), rad(1/2), "rgba(0, 50, 255, 0.1)");
    Painter.rectangle(this, rad(1/2), 2, -rad(0.17), -rad(1/2), "rgba(0, 50, 255, 0.1)");
    Painter.rectangle(this, rad(5/6), 2, rad(0.05), rad(1/4), "rgba(0, 50, 255, 0.1)");
    Painter.rectangle(this, rad(5/6), 2, rad(0.05), -rad(1/4), "rgba(0, 50, 255, 0.1)");

    function rad(scale) {
        return radius * scale;
    }
};

WindEffect.prototype.makeInfluence = function() {
    if (this.isActive()) {
        var self = this;
        _.bullets().forEach(function(bullet) {
            if (self.isPointInside(bullet.getX(), bullet.getY())) {
                var delta = 5;
                if (Math.abs( MathUtility.normalizeAngle(bullet.getAngle() - self.getAngle()) ) < delta) {
                    bullet.setAngle(self.getAngle());
                } else {
                    if (!MathUtility.isClockwiseDirection(bullet.getAngle(), self.getAngle())) {
                        delta = -delta;
                    }
                    bullet.setAngle(bullet.getAngle() + delta);
                }

                function norm(angle) {
                    return MathUtility.normalizeAngle(angle);
                }
            }
        });
    }
};

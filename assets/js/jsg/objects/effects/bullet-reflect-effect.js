function BulletReflectEffect(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'radius', 100);

    CircleObject.call(this, opts);
    Effect.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(BulletReflectEffect).from(Effect).withMixins(CircleObject);

BulletReflectEffect.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "rgba(0, 100, 0, 0.2)");
};

BulletReflectEffect.prototype.makeInfluence = function() {
    if (this.isActive()) {
        var self = this;
        _.bullets().forEach(function(bullet) {
            if (self.isPointInside(bullet.getX(), bullet.getY())) {
                var normalAngle = MathUtility.getLinesAngle(bullet.getX(), bullet.getY(), self.getX(), self.getY());
                bullet.setAngle(180 - bullet.getAngle() + 2 * normalAngle);
                bullet.move();
            }
        });
    }
};

function BulletReflectEffect(opts, draw) {
    var self = Effect(opts);

    var _radius = opts.radius || 100;
    var _bullets = opts.bullets;

    self.draw = function() {
        Painter.circle(self, _radius, "rgba(0,50,255,0.1)");
    };

    if (draw !== false) {
        self.draw();
    }

    self.makeInfluence = function() {
        if (self.haveInfluence()) {
            for (var i = 0; i < _bullets.length; i++) {
                var bullet = _bullets[i];
                if (MathUtility.isInCircle(bullet.getX(), bullet.getY(), self.getX(), self.getY(), _radius)) {
                    var normalAngle = MathUtility.getLinesAngle(bullet.getX(), bullet.getY(), self.getX(), self.getY());
                    bullet.setAngle(180 - bullet.getAngle() + 2 * normalAngle);
                    bullet.move();
                }
            }
        }
    };

    return self;
}

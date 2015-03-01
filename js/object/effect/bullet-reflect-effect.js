function BulletReflectEffect(opts, draw) {
    var self = Effect(opts);

    self._radius = opts.radius || 100;
    self._bullets = opts.bullets;

    self.draw = function() {
        Painter.circle(self, self._radius, "rgba(0,50,255,0.1)");
    };

    if (draw !== false) {
        self.draw();
    }

    self.makeInfluence = function() {
        if (self.haveInfluence()) {
            for (var i = 0; i < self._bullets.length; i++) {
                var bullet = self._bullets[i];
                if (MathUtility.isInCircle(bullet.x, bullet.y, self.x, self.y, self._radius)) {
                    var normalAngle = MathUtility.getLinesAngle(bullet.x, bullet.y, self.x, self.y);
                    bullet.angle = 180 - bullet.angle + 2 * normalAngle;
                    bullet.move();
                }
            }
        }
    };

    return self;
}

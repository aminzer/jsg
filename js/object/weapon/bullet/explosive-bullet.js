function ExplosiveBullet(opts, draw) {
    var self = Bullet(opts, false);

    // tip: count === 0 or count === undefined
    self._explosionCount = opts.explosionCount || (opts.explosionCount === 0 ? 0 : 2);
    self._childCount = opts.childCount || 3;
    self._sector = opts.sector || 10;

    self._speed = 15;
    self._lifeTime = 20;

    self.draw = function() {
        Painter.circle(self, 2, "#000");
    };

    if (draw !== false) {       // constructor's call from child
        self.draw();
    }

    self.destroy = function() {
        console.log(self._explosionCount);
        if (self._explosionCount > 0) {
            for (var angle = self.angle - self._sector/2; angle <= self.angle + self._sector/2; angle += self._sector / (self._childCount-1)) {
                self._bullets.push(ExplosiveBullet({
                    bullets: self._bullets,
                    stage: self._stage,
                    x: self.x,
                    y: self.y,
                    angle: angle,
                    lifeTime: 20,
                    explosionCount: self._explosionCount - 1
                }));
            }
        }
    };

    return self;
}

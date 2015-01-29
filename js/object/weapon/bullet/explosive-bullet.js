function ExplosiveBullet(opts, draw) {
    var self = Bullet(opts, false);

    // tip: count === 0 or count === undefined
    var _explosionCount = opts.explosionCount || (opts.explosionCount === 0 ? 0 : 2);
    var _childCount = opts.childCount || 3;
    var _sector = opts.sector || 10;

    self.setSpeed(15);
    self.setLifeTime(20);

    self.draw = function() {
        Painter.circle(self, 2, "#000");
    };

    if (draw !== false) {       // constructor's call from child
        self.draw();
    }

    self.destroy = function() {
        console.log(_explosionCount);
        if (_explosionCount > 0) {
            for (var angle = self.getAngle() - _sector/2; angle <= self.getAngle() + _sector/2; angle += _sector / (_childCount-1)) {
                self.getGlobalBullets().push(ExplosiveBullet({
                    bullets: self.getGlobalBullets(),
                    stage: self.getStage(),
                    x: self.getX(),
                    y: self.getY(),
                    angle: angle,
                    lifeTime: 20,
                    explosionCount: _explosionCount - 1
                }));
            }
        }
    };

    return self;
}
function ExplosiveBullet(opts, init) {
    var self = Bullet(opts, false);

    var _explosionCount = opts.explosionCount || (opts.explosionCount === 0 ? 0 : 2);
    var _childCount = opts.childCount || 3;
    var _sector = opts.sector || 10;

    self.setSpeed(15);
    self.setLifeTime(20);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('black').drawCircle(0, 0, 2);
        self.addShape(shape);
    };

    if (init !== false) {       // constructor's call from child
        self.init();
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
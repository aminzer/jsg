function FakeBullet(opts, draw) {
    var self = Bullet(opts, false);

    self._damage = 0;
    self._speed = 0;
    self._lifeTime = 0;

    self.draw = function() {
    };

    if (draw !== false) {
        self.draw();
    }

    self.move = function() {
        return self._lifeTime > 0;
    };

    return self;
}

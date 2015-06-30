function Rocket(opts, draw) {
    var self = Bullet(opts, false);

    self._damage = ROCKET_DAMAGE;
    self._speed = ROCKET_START_SPEED;
    self._lifeTime = ROCKET_LIFETIME;

    self.draw = function() {
        Painter.rectangle(self, 40, 6, 40, 3, "#999");
        Painter.roundRectangle(self, 20, 8, 20, 4, 3, "#333");
        Painter.rectangle(self, 2, 8, 40, 4, "#f00");
        Painter.rectangle(self, 2, 8, 6, 4, "#f00");
        Painter.rectangle(self, 2, 8, 13, 4, "#f00");
    };

    if (draw !== false) {
        self.draw();
    }

    self.move = function() {
        self.moveX(self._speed * cos_d(self.angle));
        self.moveY(self._speed * sin_d(self.angle));
        self._lifeTime = self._lifeTime - 1;

        if (self._lifeTime < ROCKET_START_ACCELERATION_LIFETIME && self._lifeTime > ROCKET_END_ACCELERATION_LIFETIME) {
            self._speed = self._speed + ROCKET_ACCELERATION;
        }

        return self._lifeTime > 0;
    };

    return self;
}

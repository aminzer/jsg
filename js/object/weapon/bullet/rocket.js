function Rocket(opts, draw) {
    var self = Bullet(opts, false);

    self.setDamage(ROCKET_DAMAGE);
    self.setSpeed(ROCKET_START_SPEED);
    self.setLifeTime(ROCKET_LIFETIME);

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
        self.moveX(self.getSpeed() * cos_d(self.getAngle()));
        self.moveY(self.getSpeed() * sin_d(self.getAngle()));
        self.setLifeTime(self.getLifetime() - 1);

        if (self.getLifetime() < ROCKET_START_ACCELERATION_LIFETIME && self.getLifetime() > ROCKET_END_ACCELERATION_LIFETIME) {
            self.setSpeed(self.getSpeed() + ROCKET_ACCELERATION);
        }

        return self.getLifetime() > 0;
    };

    return self;
}

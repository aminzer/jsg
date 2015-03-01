function ExplosiveRocket(opts, draw) {
    var self = Rocket(opts, false);

    self._damage = EXPLOSIVE_ROCKET_DAMAGE;
    self._speed = EXPLOSIVE_ROCKET_START_SPEED;
    self._lifeTime = EXPLOSIVE_ROCKET_LIFETIME;

    if (draw !== false) {
        self.draw();
    }

    self.destroy = function() {
        for (var angle = 0; angle < 360; angle += 360 / EXPLOSIVE_ROCKET_FRACTION_COUNT) {
            self._bullets.push(Fraction({
                bullets: self._bullets,
                stage: self._stage,
                x: self.x - 30 * cos_d(self.angle),   // rocket explode in it's tail
                y: self.y - 30 * sin_d(self.angle),
                angle: angle,
                damage: EXPLOSIVE_ROCKET_FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifeTime: EXPLOSIVE_ROCKET_FRACTION_LIFETIME
            }));
        }
    };

    return self;
}

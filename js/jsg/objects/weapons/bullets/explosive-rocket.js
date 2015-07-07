function ExplosiveRocket(opts, draw) {
    var self = Rocket(opts, false);

    self._damage = BULLET.EXPLOSIVE_ROCKET.DAMAGE;
    self._speed = BULLET.EXPLOSIVE_ROCKET.START_SPEED;
    self._lifeTime = BULLET.EXPLOSIVE_ROCKET.LIFETIME;

    if (draw !== false) {
        self.draw();
    }

    self.destroy = function() {
        for (var angle = 0; angle < 360; angle += 360 / BULLET.EXPLOSIVE_ROCKET.FRACTION_COUNT) {
            self._bullets.push(Fraction({
                bullets: self._bullets,
                stage: self._stage,
                x: self.x - 30 * cos_d(self.angle),   // rocket explode in it's tail
                y: self.y - 30 * sin_d(self.angle),
                angle: angle,
                damage: BULLET.EXPLOSIVE_ROCKET.FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifeTime: BULLET.EXPLOSIVE_ROCKET.FRACTION_LIFETIME
            }));
        }
    };

    return self;
}

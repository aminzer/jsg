function ExplosiveRocket(opts, init) {
    var self = Rocket(opts, false);

    self.setDamage(EXPLOSIVE_ROCKET_DAMAGE);
    self.setSpeed(EXPLOSIVE_ROCKET_START_SPEED);
    self.setLifeTime(EXPLOSIVE_ROCKET_LIFETIME);

    if (init !== false) {
        self.init();
    }

    self.destroy = function() {
        for (var angle = 0; angle < 360; angle += 360 / EXPLOSIVE_ROCKET_FRACTION_COUNT) {
            self.getGlobalBullets().push(Fraction({
                bullets: self.getGlobalBullets(),
                stage: self.getStage(),
                x: self.getX() - 30 * cos_d(self.getAngle()),   // rocket explode in it's tail
                y: self.getY() - 30 * sin_d(self.getAngle()),
                angle: angle,
                damage: EXPLOSIVE_ROCKET_FRACTION_DAMAGE,
                speed: 10 + random() * 5,
                lifeTime: EXPLOSIVE_ROCKET_FRACTION_LIFETIME
            }));
        }
    };

    return self;
}

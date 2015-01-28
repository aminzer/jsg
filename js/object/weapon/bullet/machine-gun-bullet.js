function MachineGunBullet(opts, draw) {
    var self = Bullet(opts, false);

    self.setDamage(MACHINE_GUN_BULLET_DAMAGE);
    self.setSpeed(MACHINE_GUN_BULLET_SPEED);
    self.setLifeTime(MACHINE_GUN_BULLET_LIFETIME);

    self.draw = function() {
        Painter.circle(self, 2, "#000");
        Painter.circle(self, 1, "#600");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

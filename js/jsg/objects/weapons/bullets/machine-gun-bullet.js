function MachineGunBullet(opts, draw) {
    var self = Bullet(opts, false);

    self._damage = MACHINE_GUN_BULLET_DAMAGE;
    self._speed = MACHINE_GUN_BULLET_SPEED;
    self._lifeTime = MACHINE_GUN_BULLET_LIFETIME;

    self.draw = function() {
        Painter.circle(self, 2, "#000");
        Painter.circle(self, 1, "#600");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

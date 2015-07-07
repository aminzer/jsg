function MachineGunBullet(opts, draw) {
    var self = Bullet(opts, false);

    self._damage = BULLET.MACHINE_GUN.DAMAGE;
    self._speed = BULLET.MACHINE_GUN.SPEED;
    self._lifeTime = BULLET.MACHINE_GUN.LIFETIME;

    self.draw = function() {
        Painter.circle(self, 2, "#000");
        Painter.circle(self, 1, "#600");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

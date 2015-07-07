function RocketLauncher(opts, draw) {
    var self = Weapon(opts);

    self._maxSector = WEAPON.ROCKET_LAUNCHER.MAX_SECTOR;
    self._frontLength = WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH;
    self.setHardness(WEAPON.ROCKET_LAUNCHER.HARDNESS);
    self._shootingDelay = WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY;
    self._charger._bulletConstructor = opts.bulletConstructor || ExplosiveRocket;

    self.draw = function() {
        Painter.rectangle(self, self._frontLength + 30, 8, 30, 4, "#244482");
        Painter.offsetRectangle(self, 21, 0, 8, 10, 0, 5, "#bbb");
        Painter.offsetRectangle(self, -27, 0, 12, 4, 0, 2, "#999");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

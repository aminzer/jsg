function RocketLauncher(opts, draw) {
    var self = Weapon(opts);

    self._maxSector = ROCKET_LAUNCHER_MAX_SECTOR;
    self._frontLength = ROCKET_LAUNCHER_FRONT_LENGTH;
    self.setHardness(ROCKET_LAUNCHER_HARDNESS);
    self._shootingDelay = ROCKET_LAUNCHER_SHOOTING_DELAY;
    self._bulletConstructor = opts.bulletConstructor || ExplosiveRocket;

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

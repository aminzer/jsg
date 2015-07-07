function TankGun(opts, draw) {
    var self = Weapon(opts);

    self._maxSector = WEAPON.TANK_GUN.MAX_SECTOR;
    self._frontLength = WEAPON.TANK_GUN.FRONT_LENGTH;
    self.setHardness(WEAPON.TANK_GUN.HARDNESS);
    self._shootingDelay = WEAPON.TANK_GUN.SHOOTING_DELAY;
    self._charger._bulletConstructor = opts.bulletConstructor || ExplosiveRocket;
    self._weaponOffsetY = 1;
    self._weaponOffsetX = 20;

    self.draw = function() {
        Painter.rectangle(self, self._frontLength + 30, 14, 30, 7, "#381D11");
        Painter.roundRectangle(self, 70, 50, 35, 25, 15, "#27130D");
        Painter.offsetRoundRectangle(self, self._frontLength, 0, 10, 16, 5, 8, 2, "#21100F");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

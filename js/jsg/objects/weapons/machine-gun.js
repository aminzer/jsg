function MachineGun(opts, draw) {
    var self = AutomaticWeapon(opts);

    self._rateOfFire = WEAPON.MACHINE_GUN.RATE_OF_FIRE;
    self._maxSector = WEAPON.MACHINE_GUN.MAX_SECTOR;
    self._frontLength = WEAPON.MACHINE_GUN.FRONT_LENGTH;
    self.setHardness(WEAPON.MACHINE_GUN.HARDNESS);
    self._charger._bulletConstructor = opts.bulletConstructor || MachineGunBullet;

    self.draw = function() {
        Painter.rectangle(self, self._frontLength + 20, 4, 20, 2, "#8A8A8A");
        Painter.rectangle(self, 20, 10, 10, 4, "#444");
        Painter.rectangle(self, 7, 8, 20, 4, "#444");
        Painter.rectangle(self, 10, 4, -30, 2, "#222");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

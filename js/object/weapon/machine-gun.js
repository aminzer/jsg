function MachineGun(opts, draw) {
    var self = AutomaticWeapon(opts);

    self.setRateOfFire(MACHINE_GUN_RATE_OF_FIRE);
    self.setMaxSector(MACHINE_GUN_MAX_SECTOR);
    self.setFrontLength(MACHINE_GUN_FRONT_LENGTH);
    self.setHardness(MACHINE_GUN_HARDNESS);
    self.setBulletConstructor(opts.bulletConstructor || MachineGunBullet);

    self.draw = function() {
        Painter.rectangle(self, self.getFrontLength() + 20, 4, 20, 2, "#8A8A8A");
        Painter.rectangle(self, 20, 10, 10, 4, "#444");
        Painter.rectangle(self, 7, 8, 20, 4, "#444");
        Painter.rectangle(self, 10, 4, -30, 2, "#222");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

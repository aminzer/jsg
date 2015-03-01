function TankGun(opts, draw) {
    var self = Weapon(opts);

    self.setMaxSector(TANK_GUN_MAX_SECTOR);
    self.setFrontLength(TANK_GUN_FRONT_LENGTH);
    self.setHardness(TANK_GUN_HARDNESS);
    self.setShootingDelay(TANK_GUN_SHOOTING_DELAY);
    self.setBulletConstructor(opts.bulletConstructor || ExplosiveRocket);
    self.setWeaponOffsetY(1);
    self.setWeaponOffsetX(20);

    self.draw = function() {
        Painter.rectangle(self, self.getFrontLength() + 30, 14, 30, 7, "#381D11");
        Painter.roundRectangle(self, 70, 50, 35, 25, 15, "#27130D");
        Painter.offsetRoundRectangle(self, self.getFrontLength(), 0, 10, 16, 5, 8, 2, "#21100F");
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

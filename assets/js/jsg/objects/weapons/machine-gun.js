function MachineGun(opts, render) {
    opts = opts || {};

    AutomaticWeapon.call(this, opts);

    this.setRateOfFire(WEAPON.MACHINE_GUN.RATE_OF_FIRE);
    this.setMaxSector(WEAPON.MACHINE_GUN.MAX_SECTOR);
    this.setFrontLength(WEAPON.MACHINE_GUN.FRONT_LENGTH);
    this.setHardness(WEAPON.MACHINE_GUN.HARDNESS);
    this.getCharger().setBulletConstructor(this.def( opts.bulletConstructor, MachineGunBullet ));

    if (render !== false) {
        this.render();
    }
}

Extend(MachineGun).from(AutomaticWeapon);

MachineGun.prototype.render = function () {
    Painter.rectangle(this, this.getFrontLength() + 20, 4, 20, 2, "#8A8A8A");
    Painter.rectangle(this, 20, 10, 10, 4, "#444");
    Painter.rectangle(this, 7, 8, 20, 4, "#444");
    Painter.rectangle(this, 10, 4, -30, 2, "#222");
};

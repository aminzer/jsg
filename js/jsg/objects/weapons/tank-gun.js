function TankGun(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.setMaxSector(WEAPON.TANK_GUN.MAX_SECTOR);
    this.setFrontLength(WEAPON.TANK_GUN.FRONT_LENGTH);
    this.setHardness(WEAPON.TANK_GUN.HARDNESS);
    this.setShootingDelay(WEAPON.TANK_GUN.SHOOTING_DELAY);
    this.getCharger().setBulletConstructor(this.def( opts.bulletConstructor, ExplosiveRocket ));
    this.setOffsetY(0);
    this.setOffsetX(20);

    if (render !== false) {
        this.render();
    }
}

TankGun.prototype = Object.create(Weapon.prototype);

TankGun.prototype.render = function() {
    Painter.rectangle(this, this.getFrontLength() + 30, 14, 30, 7, "#381D11");
    Painter.roundRectangle(this, 70, 50, 35, 25, 15, "#27130D");
    Painter.offsetRoundRectangle(this, this.getFrontLength(), 0, 10, 16, 5, 8, 2, "#21100F");
};

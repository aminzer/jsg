function Mortar(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.setMaxSector(WEAPON.ROCKET_LAUNCHER.MAX_SECTOR);
    this.setFrontLength(WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH);
    this.setHardness(WEAPON.ROCKET_LAUNCHER.HARDNESS);
    this.setShootingDelay(WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY);
    this.getCharger().setBulletConstructor(MineDelivery);

    if (render !== false) {
        this.render();
    }
}

Extend(Mortar).from(Weapon);

Mortar.prototype.render = function() {
    Painter.roundRectangle(this, this.getFrontLength() + 30, 10, 30, 5, 5, "#306337");
    Painter.offsetRectangle(this, 23, 0, 8, 12, 0, 6, "#B0BA3C");
    Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#B0BA3C");
};

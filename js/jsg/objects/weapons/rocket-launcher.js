function RocketLauncher(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.setMaxSector(WEAPON.ROCKET_LAUNCHER.MAX_SECTOR);
    this.setFrontLength(WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH);
    this.setHardness(WEAPON.ROCKET_LAUNCHER.HARDNESS);
    this.setShootingDelay(WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY);
    this.getCharger().setBulletConstructor(opts.bulletConstructor || ExplosiveRocket);

    if (render !== false) {
        this.render();
    }
}

RocketLauncher.prototype = Object.create(Weapon.prototype);

RocketLauncher.prototype.render = function() {
    Painter.rectangle(this, this.getFrontLength() + 30, 8, 30, 4, "#244482");
    Painter.offsetRectangle(this, 21, 0, 8, 10, 0, 5, "#bbb");
    Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#999");
};

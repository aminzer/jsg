function Mortar(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.maxSector = WEAPON.ROCKET_LAUNCHER.MAX_SECTOR;
    this.frontLength = WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH;
    this.hardness = WEAPON.ROCKET_LAUNCHER.HARDNESS;
    this.shootingDelay = WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY;
    this.charger.bulletConstructor = MineDelivery;

    if (render !== false) {
        this.render();
    }
}

meta.Class( Mortar )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.roundRectangle(this, this.frontLength + 30, 10, 30, 5, 5, "#306337");
            Painter.offsetRectangle(this, 23, 0, 8, 12, 0, 6, "#B0BA3C");
            Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#B0BA3C");
        }
    })
;

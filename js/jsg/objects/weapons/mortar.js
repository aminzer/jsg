function Mortar(opts, render) {
    opts = new meta.Hash(opts).merge({
        maxSector: WEAPON.ROCKET_LAUNCHER.MAX_SECTOR,
        frontLength: WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH,
        hardness: WEAPON.ROCKET_LAUNCHER.HARDNESS,
        shootingDelay: WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY
    }).to_obj();

    Weapon.call(this, opts);

    this.charger.bulletConstructor = MineDelivery;

    if (render !== false) {
        this.render();
    }
}

new meta.Class( Mortar )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.roundRectangle(this, this.frontLength + 30, 10, 30, 5, 5, "#306337");
            Painter.offsetRectangle(this, 23, 0, 8, 12, 0, 6, "#B0BA3C");
            Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#B0BA3C");
        }
    })
;

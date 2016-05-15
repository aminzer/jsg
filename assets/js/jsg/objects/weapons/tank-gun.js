function TankGun(opts, render) {
    opts = new meta.Hash(opts).merge({
        maxSector: WEAPON.TANK_GUN.MAX_SECTOR,
        frontLength: WEAPON.TANK_GUN.FRONT_LENGTH,
        hardness: WEAPON.TANK_GUN.HARDNESS,
        shootingDelay: WEAPON.TANK_GUN.SHOOTING_DELAY,
        offsetX: 20,
        offsetY: 0
    }).to_obj();

    Weapon.call(this, opts);

    this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );

    if (render !== false) {
        this.render();
    }
}

meta.Class( TankGun )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 30, 14, 30, 7, "#381D11");
            Painter.roundRectangle(this, 70, 50, 35, 25, 15, "#27130D");
            Painter.offsetRoundRectangle(this, this.frontLength, 0, 10, 16, 5, 8, 2, "#21100F");
        }
    })
;

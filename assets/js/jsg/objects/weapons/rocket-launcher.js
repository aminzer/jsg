function RocketLauncher(opts, render) {
    opts = new meta.Hash(opts).merge({
        maxSector: WEAPON.ROCKET_LAUNCHER.MAX_SECTOR,
        frontLength: WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH,
        hardness: WEAPON.ROCKET_LAUNCHER.HARDNESS,
        shootingDelay: WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY
    }).to_obj();

    Weapon.call(this, opts);

    this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );

    if (render !== false) {
        this.render();
    }
}

new meta.Class( RocketLauncher )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 30, 8, 30, 4, "#244482");
            Painter.offsetRectangle(this, 21, 0, 8, 10, 0, 5, "#bbb");
            Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#999");
        }
    })
;

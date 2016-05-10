function RocketLauncher(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.maxSector = WEAPON.ROCKET_LAUNCHER.MAX_SECTOR;
    this.frontLength = WEAPON.ROCKET_LAUNCHER.FRONT_LENGTH;
    this.hardness = WEAPON.ROCKET_LAUNCHER.HARDNESS;
    this.shootingDelay = WEAPON.ROCKET_LAUNCHER.SHOOTING_DELAY;
    this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );

    if (render !== false) {
        this.render();
    }
}

meta.Class( RocketLauncher )

    .extend_from( Weapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 30, 8, 30, 4, "#244482");
            Painter.offsetRectangle(this, 21, 0, 8, 10, 0, 5, "#bbb");
            Painter.offsetRectangle(this, -27, 0, 12, 4, 0, 2, "#999");
        }
    })
;

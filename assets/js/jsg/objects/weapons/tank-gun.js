function TankGun(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    this.maxSector = WEAPON.TANK_GUN.MAX_SECTOR;
    this.frontLength = WEAPON.TANK_GUN.FRONT_LENGTH;
    this.hardness = WEAPON.TANK_GUN.HARDNESS;
    this.shootingDelay = WEAPON.TANK_GUN.SHOOTING_DELAY;
    this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, ExplosiveRocket );
    this.offsetY = 0;
    this.offsetX = 20;

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

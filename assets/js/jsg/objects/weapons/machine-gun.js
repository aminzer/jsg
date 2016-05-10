function MachineGun(opts, render) {
    opts = opts || {};

    AutomaticWeapon.call(this, opts);

    this.maxSector = WEAPON.MACHINE_GUN.MAX_SECTOR;
    this.frontLength = WEAPON.MACHINE_GUN.FRONT_LENGTH;
    this.hardness = WEAPON.MACHINE_GUN.HARDNESS;
    this.rateOfFire = WEAPON.MACHINE_GUN.RATE_OF_FIRE;
    this.charger.bulletConstructor = meta.common.first_defined( opts.bulletConstructor, MachineGunBullet );

    if (render !== false) {
        this.render();
    }
}

meta.Class( MachineGun )

    .extend_from( AutomaticWeapon )

    .define_method({
        render: function () {
            Painter.rectangle(this, this.frontLength + 20, 4, 20, 2, "#8A8A8A");
            Painter.rectangle(this, 20, 10, 10, 4, "#444");
            Painter.rectangle(this, 7, 8, 20, 4, "#444");
            Painter.rectangle(this, 10, 4, -30, 2, "#222");
        }
    })
;

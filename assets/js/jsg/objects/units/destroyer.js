function Destroyer(opts, render) {
    opts = new meta.Hash( opts ).merge({
        radius: UNIT.DESTROYER.RADIUS,
        maxHp: UNIT.DESTROYER.HP,
        weaponSet: WeaponSet.oneGun(new CompositeWeapon({
            weaponConstructors: [MachineGun, MachineGun, RocketLauncher],
            offsetsY: [-22, -9, 19],
            offsetsX: [-1, 2, 0]
        }, false))
    }).to_obj();

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( Destroyer )

    .extend_from( CircleUnit )

    .define_methods({
        render: function () {
            Painter.circle(this, this.radius, "#c22");
            Painter.rectangle(this, 10, 2 * (this.radius - 1), 5, this.radius - 1, "#fd1");
            Painter.rectangle(this, 26, 8, 13, -1, "#fd1");

            if (this.weapon != null) {
                this.weapon.render();
            }
        }
    })
;

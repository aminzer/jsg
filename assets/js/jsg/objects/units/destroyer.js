function Destroyer(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        radius: UNIT.DESTROYER.RADIUS,
        maxHp: UNIT.DESTROYER.HP,
        weaponSet: WeaponSet.oneGun(new CompositeWeapon({
            weaponConstructors: [MachineGun, MachineGun, RocketLauncher],
            offsetsY: [-22, -9, 19],
            offsetsX: [-1, 2, 0]
        }, false))
    });

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( Destroyer )

    .extend_from( CircleUnit )

    .define_methods({
        render: function () {
            Painter.circle(this, this.getRadius(), "#c22");
            Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#fd1");
            Painter.rectangle(this, 26, 8, 13, -1, "#fd1");

            if (this.getWeapon() != null) {
                this.getWeapon().render();
            }
        }
    })
;

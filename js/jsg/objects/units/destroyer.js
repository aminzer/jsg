function Destroyer(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this.setRadius(UNIT.DESTROYER.RADIUS);
    this.setMaxHp(UNIT.DESTROYER.HP);
    this.setWeaponSet(
        WeaponSet.oneGun(new CompositeWeapon({
            weaponConstructors: [MachineGun, MachineGun, RocketLauncher],
            offsetsY: [-22, -9, 19],
            offsetsX: [-1, 2, 0]
        }, false))
    );

    if (render !== false) {
        this.render();
    }
}

Extend(Destroyer).from(CircleUnit);

Destroyer.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#c22");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#fd1");
    Painter.rectangle(this, 26, 8, 13, -1, "#fd1");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

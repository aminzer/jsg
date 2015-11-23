function MachineGunner(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new MachineGun({}, false)));

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(MachineGunner).from(CircleUnit);

MachineGunner.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#E08A19");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#7A4D11");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

function MachineGunner(opts, render) {
    opts = opts || {};

    Unit.call(this, opts);

    this.setWeapon(new MachineGun({}, false));

    if (render !== false) {
        this.render();
    }
}

MachineGunner.prototype = Object.create(Unit.prototype);

MachineGunner.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#E08A19");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#7A4D11");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

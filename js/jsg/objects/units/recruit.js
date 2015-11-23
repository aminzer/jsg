function Recruit(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new GrandfathersGun({}, false)));

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(Recruit).from(CircleUnit);

Recruit.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#199EE0");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#559");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

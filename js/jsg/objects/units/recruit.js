function Recruit(opts, render) {
    opts = opts || {};

    Unit.call(this, opts);

    this.setWeapon(new GrandfathersGun({}, false));

    if (render !== false) {
        this.render();
    }
}

Recruit.prototype = Object.create(Unit.prototype);

Recruit.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#199EE0");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#559");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

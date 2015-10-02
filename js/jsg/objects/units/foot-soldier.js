function FootSoldier(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this.setWeapon(new AutomaticGun({}, false));

    if (render !== false) {
        this.render();
    }
}

Extend(FootSoldier).from(CircleUnit);

FootSoldier.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#559");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#199EE0");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

function FootSoldier(opts, render) {
    Unit.call(this, opts);

    this.setWeapon(new AutomaticGun({}, false));

    if (render !== false) {
        this.render();
    }
}

FootSoldier.prototype = Object.create(Unit.prototype);

FootSoldier.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#559");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#199EE0");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

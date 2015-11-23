function GuyWithPanzerschreck(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new RocketLauncher({}, false)));

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(GuyWithPanzerschreck).from(CircleUnit);

GuyWithPanzerschreck.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#8D91E3");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#34378A");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

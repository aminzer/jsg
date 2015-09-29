function GuyWithPanzerschreck(opts, render) {
    opts = opts || {};

    Unit.call(this, opts);

    this.setWeapon(new RocketLauncher({}, false));

    if (render !== false) {
        this.render();
    }
}

GuyWithPanzerschreck.prototype = Object.create(Unit.prototype);

GuyWithPanzerschreck.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#8D91E3");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#34378A");

    if (this.getWeapon() != null) {
        this.getWeapon().render();
    }
};

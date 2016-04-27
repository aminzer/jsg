function AutomaticGun(opts, render) {
    opts = opts || {};

    AutomaticWeapon.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(AutomaticGun).from(AutomaticWeapon);

AutomaticGun.prototype.render = function() {
    Painter.rectangle(this, this.getFrontLength() + 15, 5, 15, 2.5, "#555");
    Painter.rectangle(this, 10, 5, -7, 0, "#691C1C");
    Painter.rectangle(this, this.getFrontLength(), 2, 10, 1, "#ddd");
};

function GrandfathersGun(opts, render) {
    opts = opts || {};

    Weapon.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(GrandfathersGun).from(Weapon);

GrandfathersGun.prototype.render = function() {
    Painter.rectangle(this, this.getFrontLength() + 15, 5, 15, 2.5, "#444");
    Painter.rectangle(this, this.getFrontLength(), 2, 10, 1, "#999");
};
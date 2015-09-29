function Fraction(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    if (render !== false) {
        this.render();
    }
}

Fraction.prototype = Object.create(Bullet.prototype);

Fraction.prototype.render = function() {
    Painter.rectangle(this, 3, 3, 1.5, 1.5, "#f00");
};

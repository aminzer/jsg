function Tommy(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'speed', PLAYER.SPEED);
    this.setIfUndefined(opts, 'maxHp', PLAYER.HP);

    CircleUnit.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(Tommy).from(CircleUnit);

Tommy.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#73B500");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#345200");

    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

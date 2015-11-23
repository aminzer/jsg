function Player(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this.setSpeed(this.def( opts.speed, PLAYER.SPEED ));
    this.setMaxHp(this.def( opts.hp, PLAYER.HP ));
    this.setObjectType(OBJECT_TYPE.PLAYER);

    if (render !== false) {
        this.render();
    }
}

Extend(Player).from(CircleUnit);

Player.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#73B500");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#345200");

    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

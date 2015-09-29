function Player(opts, render) {
    opts = opts || {};

    Unit.call(this, opts);

    this._arsenal = [];
    this._weaponIndex = 0;      // index of current weapon in arsenal

    this.setObjectType(OBJECT_TYPE.PLAYER);
    this.setSpeed(opts.speed || PLAYER.SPEED);
    this.setMaxHp(opts.hp || PLAYER.HP);

    initArsenal.call(this);

    if (render !== false) {
        this.render();
    }

    function initArsenal() {
        this._arsenal.push(
            new GrandfathersGun({
                offsetY: 0
            }, false),
            new AutomaticGun({}, false),
            new MachineGun({}, false),
            new RocketLauncher({}, false),
            new CompositeWeapon({
                weaponConstructors: [RocketLauncher, RocketLauncher, RocketLauncher],
                offsetsY: [15, -15, 1]
            }, false)
        );

        this.chooseWeapon(this._weaponIndex);
    }
}

Player.prototype = Object.create(Unit.prototype);

Player.prototype.render = function() {
    Painter.circle(this, this.getRadius(), "#73B500");
    Painter.rectangle(this, 10, 2 * (this.getRadius() - 1), 5, this.getRadius() - 1, "#345200");

    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

Player.prototype.chooseWeapon = function(index) {
    if (this.getWeapon() != null) {
        this.getWeapon().destroyShapes();
    }

    this._weaponIndex = index;

    if (this._weaponIndex < 0) {
        this._weaponIndex = 0;
    }

    if (this._weaponIndex > this._arsenal.length - 1) {
        this._weaponIndex = this._arsenal.length - 1;
    }

    this.setWeapon( this._arsenal[this._weaponIndex] );
    this.getWeapon().render();
};

Player.prototype.chooseNextWeapon = function() {
    this.chooseWeapon(this._weaponIndex + 1);
};

Player.prototype.choosePrevWeapon = function() {
    this.chooseWeapon(this._weaponIndex - 1);
};

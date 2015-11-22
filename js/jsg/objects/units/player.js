function Player(opts, render) {
    opts = opts || {};

    CircleUnit.call(this, opts);

    this._arsenal = this.def( opts.arsenal || [] );
    this._weaponIndex = 0;      // index of current weapon in arsenal

    this.setSpeed(this.def( opts.speed, PLAYER.SPEED ));
    this.setMaxHp(this.def( opts.hp, PLAYER.HP ));
    this.setObjectType(OBJECT_TYPE.PLAYER);

    this.chooseWeapon(this._weaponIndex);

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

Player.prototype.shoot = function() {
    Player.prototype._parentPrototype.shoot.call(this);
};

Player.prototype.startShooting = function() {
    Player.prototype._parentPrototype.startShooting.call(this);
//    console.log(this.getWeapon().getCharger().getBulletCount() + '/' + this.getWeapon().getCharger().getBulletCapacity());
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

    if (this._weaponIndex < 0 || this._weaponIndex >= this._arsenal.length) {
        return;
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

Player.prototype.getArsenal = function() {
    return this._arsenal;
};

Player.prototype.setArsenal = function(arsenal) {
    this._arsenal = arsenal;
};

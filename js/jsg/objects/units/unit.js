function Unit(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._maxHp = this.def( opts.maxHp, UNIT.DEFAULT.HP );
    this._hp = this.def( opts.hp, this._maxHp );

    this._weapon = null;

    this.setObjectType(OBJECT_TYPE.ENEMY);
}

Unit.prototype = Object.create(MovingObject.prototype);

Unit.prototype.isPointInside = function(pointX, pointY) {
    // must define shape
    return false;
};

Unit.prototype.hasWeapon = function() {
    return this._weapon != null;
};

Unit.prototype.aimAt = function(targetX, targetY) {
    this.setAngle( MathUtility.getLinesAngle(this.getX(), this.getY(), targetX, targetY) );
    if (this.hasWeapon()) {
        this._weapon.aimAt(targetX, targetY, this.getX(), this.getY(), this.getAngle());
    }
};

Unit.prototype.shoot = function() {
    if (this.hasWeapon()) {
        this._weapon.shoot();
    }
};

Unit.prototype.startShooting = function() {
    if (this.hasWeapon()) {
        this._weapon.startShooting();
    }
};

Unit.prototype.stopShooting = function() {
    if (this.hasWeapon()) {
        this._weapon.stopShooting();
    }};

Unit.prototype.takeDamage = function(damage) {
    this._hp -= damage;
};

Unit.prototype.isAlive = function() {
    return this._hp > 0;
};

Unit.prototype.isPointInside = function(pointX, pointY) {
    return MathUtility.isInCircle(pointX, pointY, this._x, this._y, this._radius);
};

// @Override
Unit.prototype.parent_updateShapes = Unit.prototype.updateShapes;
Unit.prototype.updateShapes = function() {
    Unit.prototype.parent_updateShapes.call(this);
    if (this.hasWeapon()) {
        this._weapon.updateShapes();
    }
};

// @Override
Unit.prototype.parent_destroyShapes = Unit.prototype.destroyShapes;
Unit.prototype.destroyShapes = function() {
    Unit.prototype.parent_destroyShapes.call(this);
    if (this.hasWeapon()) {
        this._weapon.destroyShapes();
    }
};

Unit.prototype.getMaxHp = function() {
    return this._maxHp;
};

Unit.prototype.setMaxHp = function(maxHp) {
    this._maxHp = this._hp = maxHp;
};

Unit.prototype.getHp = function() {
    return this._hp;
};

Unit.prototype.setHp = function(hp) {
    this._hp = hp;
};

Unit.prototype.getWeapon = function() {
    return this._weapon;
};

Unit.prototype.setWeapon = function(weapon) {
    this._weapon = weapon;
};

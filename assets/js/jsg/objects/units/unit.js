function Unit(opts) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        speed: UNIT.DEFAULT.SPEED
    });

    MovingObject.call(this, opts);

    this._maxHp = meta.common.first_defined( opts.maxHp, UNIT.DEFAULT.HP );
    this._hp = meta.common.first_defined( opts.hp, this._maxHp );

    this._weaponSet = meta.common.first_defined( opts.weaponSet || new WeaponSet({}) );
    this.chooseWeapon(0);

    this.setObjectType(OBJECT_TYPE.ENEMY);
}

Extend(Unit).from(MovingObject);

Unit.prototype.isPointInside = function(pointX, pointY) {
    // must define shape
    return false;
};

Unit.prototype.getWeapon = function() {
    return this._weaponSet.getCurrentWeapon();
};

Unit.prototype.hasWeapon = function() {
    return this.getWeapon() != null;
};

Unit.prototype.chooseWeapon = function(index) {
    if (this.hasWeapon()) {
        this.getWeapon().destroyShapes();
    }
    this._weaponSet.chooseWeapon(index);
    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

Unit.prototype.chooseNextWeapon = function() {
    if (this.hasWeapon()) {
        this.getWeapon().destroyShapes();
    }
    this._weaponSet.chooseNextWeapon();
    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

Unit.prototype.choosePrevWeapon = function() {
    if (this.hasWeapon()) {
        this.getWeapon().destroyShapes();
    }
    this._weaponSet.choosePrevWeapon();
    if (this.hasWeapon()) {
        this.getWeapon().render();
    }
};

Unit.prototype.aimAt = function(targetX, targetY) {
    this.setAngle( MathUtility.getLinesAngle(this.getX(), this.getY(), targetX, targetY) );
    if (this.hasWeapon()) {
        this.getWeapon().aimAt(targetX, targetY, this.getX(), this.getY(), this.getAngle());
    }
};

Unit.prototype.shoot = function() {
    if (this.hasWeapon()) {
        this.getWeapon().shoot();
    }
};

Unit.prototype.startShooting = function() {
    if (this.hasWeapon()) {
        this.getWeapon().startShooting();
    }
};

Unit.prototype.stopShooting = function() {
    if (this.hasWeapon()) {
        this.getWeapon().stopShooting();
    }};

Unit.prototype.takeDamage = function(damage) {
    this._hp -= damage;
};

Unit.prototype.isAlive = function() {
    return this._hp > 0;
};

// @Override
Unit.prototype.parent_updateShapes = Unit.prototype.updateShapes;
Unit.prototype.updateShapes = function() {
    Unit.prototype.parent_updateShapes.call(this);
    if (this.hasWeapon()) {
        this.getWeapon().updateShapes();
    }
};

// @Override
Unit.prototype.parent_destroyShapes = Unit.prototype.destroyShapes;
Unit.prototype.destroyShapes = function() {
    Unit.prototype.parent_destroyShapes.call(this);
    if (this.hasWeapon()) {
        this.getWeapon().destroyShapes();
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

Unit.prototype.getWeaponSet = function() {
    return this._weaponSet;
};

Unit.prototype.setWeaponSet = function(weaponSet) {
    this._weaponSet = weaponSet;
    this.chooseWeapon(0);
};

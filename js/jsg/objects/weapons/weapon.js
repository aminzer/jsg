function Weapon(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._frontLength = WEAPON.DEFAULT.FRONT_LENGTH;
    //this._offsetY = opts.offsetY || (opts.offsetY === 0 ? 0 : UNIT.DEFAULT.RADIUS - 5);
    this._offsetY = typeof (opts.offsetY) === 'undefined' ? UNIT.DEFAULT.RADIUS - 5 : opts.offsetY;
    this._offsetX = opts.offsetX || 0;

    this._hardness = WEAPON.DEFAULT.HARDNESS;             // max number of bullets to completely reduce the accuracy
    this._state = this._hardness;                         // current number of bullets to reduce the accuracy
    this._maxSector = WEAPON.DEFAULT.MAX_SECTOR;          // if accuracy = 0, bullets will be in this sector (degrees)

    this._shootingDelay = WEAPON.DEFAULT.SHOOTING_DELAY;  // min time interval between 2 shots
    this._canMakeNextShot = true;                         // to prevent shooting until shooting delay finished

    this._charger = opts.charger || new Charger(opts);
}

Weapon.prototype = Object.create(MovingObject.prototype);

Weapon.prototype.getAccuracy = function() {
    return this._state / this._hardness;
};

Weapon.prototype.harmWeapon = function() {
    if (this._state > 0) {
        this._state--;
    }
};

Weapon.prototype.shoot = function() {
    var bullet = this._charger.getNextBullet();
    if (bullet !== false) {
        bullet.setX(this.getX() + this._frontLength * cos_d(this.getAngle()));
        bullet.setY(this.getY() + this._frontLength * sin_d(this.getAngle()));
        bullet.setAngle(this.getAngle() + (1 - this.getAccuracy()) * (this._maxSector * random() - this._maxSector / 2));
        this.harmWeapon();
    }
    return bullet;
};

Weapon.prototype.canMakeNextShot = function() {
    return this._canMakeNextShot;
};

Weapon.prototype.allowMakeNextShot = function() {
    this._canMakeNextShot = true;
};

Weapon.prototype.forbidMakeNextShot = function() {
    this._canMakeNextShot = false;
};

Weapon.prototype.startShooting = function() {
    if (this.canMakeNextShot()) {
        this.shoot();

        this.forbidMakeNextShot();
        var self = this;
        setTimeout(function() {
            self.allowMakeNextShot();
        }, this._shootingDelay);
    }
};

Weapon.prototype.stopShooting = function() { };

Weapon.prototype.fix = function() {
    this._state = this._hardness;
};

Weapon.prototype.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
    this.setAngle(MathUtility.getLinesAngle(
        unitX - this._offsetY * sin_d(unitAngle) + this._offsetX * cos_d(unitAngle),
        unitY + this._offsetY * cos_d(unitAngle) + this._offsetX * sin_d(unitAngle),
        targetX,
        targetY
    ));

    this.setX(unitX - this._offsetY * sin_d(unitAngle) + this._offsetX * cos_d(unitAngle));
    this.setY(unitY + this._offsetY * cos_d(unitAngle) + this._offsetX * sin_d(unitAngle));
};

// @Override
Weapon.prototype.parent_destroyShapes = Weapon.prototype.destroyShapes;
Weapon.prototype.destroyShapes = function() {
    Weapon.prototype.parent_destroyShapes.call(this);
    this.stopShooting();
};

Weapon.prototype.getFrontLength = function() {
    return this._frontLength;
};

Weapon.prototype.setFrontLength = function(frontLength) {
    this._frontLength = frontLength;
};

Weapon.prototype.getOffsetY = function() {
    return this._offsetY;
};

Weapon.prototype.setOffsetY = function(offsetY) {
    this._offsetY = offsetY;
};

Weapon.prototype.getOffsetX = function() {
    return this._offsetX;
};

Weapon.prototype.setOffsetX = function(offsetX) {
    this._offsetX = offsetX;
};

Weapon.prototype.getHardness = function() {
    return this._hardness;
};

Weapon.prototype.setHardness = function(hardness) {
    this._state = this._hardness = hardness;
};

Weapon.prototype.getMaxSector = function() {
    return this._maxSector;
};

Weapon.prototype.setMaxSector = function(maxSector) {
    this._maxSector = maxSector;
};

Weapon.prototype.getShootingDelay = function() {
    return this._shootingDelay;
};

Weapon.prototype.setShootingDelay = function(shootingDelay) {
    this._shootingDelay = shootingDelay;
};

Weapon.prototype.getRateOfFire = function() {
    return 60000 / this._shootingDelay;
};

Weapon.prototype.setRateOfFire = function(rateOfFire) {
    this._shootingDelay = 60000 / rateOfFire;
};

Weapon.prototype.getCharger = function() {
    return this._charger;
};

Weapon.prototype.setCharger = function(charger) {
    this._charger = charger;
};

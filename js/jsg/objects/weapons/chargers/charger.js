function Charger(opts) {
    opts = opts || {};
    MovingObject.call(this, opts);

    this._bulletCapacity = opts._bulletCapacity || Number.MAX_VALUE;       // max count of bullets in charger
    this._bulletCount = opts.bulletCount || this._bulletCapacity;          // current count of bullets

    this._bulletConstructor = opts.bulletConstructor || Bullet;
}

Charger.prototype = Object.create(MovingObject.prototype);

Charger.prototype.isEmpty = function() {
    return this._bulletCount <= 0;
};

Charger.prototype.getNextBullet = function () {
    if (this.isEmpty()) {
        return false;
    }

    var nextBullet = new this._bulletConstructor();
    this._bulletCount--;
    gctx.addBullet(nextBullet);
    return nextBullet;
};

Charger.prototype.getBulletCapacity = function() {
    return this._bulletCapacity;
};

Charger.prototype.setBulletCapacity = function(bulletCapacity) {
    this._bulletCount = this._bulletCapacity = bulletCapacity;
};

Charger.prototype.getBulletCount = function() {
    return this._bulletCount;
};

Charger.prototype.setBulletCount = function(bulletCount) {
    this._bulletCount = bulletCount;
};

Charger.prototype.getBulletConstructor = function() {
    return this._bulletConstructor;
};

Charger.prototype.setBulletConstructor = function(bulletConstructor) {
    this._bulletConstructor = bulletConstructor;
};

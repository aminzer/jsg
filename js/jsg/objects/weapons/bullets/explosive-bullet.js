function ExplosiveBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this._explosionCount = this.def( opts.explosionCount, 2 );
    this._childCount = this.def( opts.childCount, 3 );
    this._sector = this.def( opts.sector, 10 );
    this._childBulletConstructor = this.def( opts.childBulletConstructor, ExplosiveBullet);

    if (render !== false) {
        this.render();
    }
}

Extend(ExplosiveBullet).from(Bullet);

ExplosiveBullet.prototype.render = function() {
    Painter.circle(this, 2, "#00f");
};

ExplosiveBullet.prototype.getChildBulletOpts = function() {
    return {
        x: this.getX(),
        y: this.getY(),
        lifeTime: this.getLifetime(),
        speed: this.getSpeed(),
        damage: this.getDamage(),
        explosionCount: this._explosionCount - 1
    };
};

ExplosiveBullet.prototype.destroy = function() {
    if (this._explosionCount > 0) {
        for (var angle = this.getAngle() - this._sector/2; angle <= this.getAngle() + this._sector/2; angle += this._sector / (this._childCount-1)) {
            var childBullet = new this._childBulletConstructor(
                this.getChildBulletOpts()
            );
            childBullet.setAngle(angle);
            gctx.addBullet(childBullet);
        }
    }
};

ExplosiveBullet.prototype.getExplosionCount = function() {
    return this._explosionCount;
};

ExplosiveBullet.prototype.setExplosionCount = function(explosionCount) {
    this._explosionCount = explosionCount;
};

ExplosiveBullet.prototype.getChildCount = function() {
    return this._childCount;
};

ExplosiveBullet.prototype.setChildCount = function(childCount) {
    this._childCount = childCount;
};

ExplosiveBullet.prototype.getSector = function() {
    return this._sector;
};

ExplosiveBullet.prototype.setSector = function(sector) {
    this._sector = sector;
};

ExplosiveBullet.prototype.getChildBulletConstructor = function() {
    return this._childBulletConstructor;
};

ExplosiveBullet.prototype.setChildBulletConstructor = function(bulletConstructor) {
    this._childBulletConstructor = bulletConstructor;
};

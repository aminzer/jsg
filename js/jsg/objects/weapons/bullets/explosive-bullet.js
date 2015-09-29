function ExplosiveBullet(opts, render) {
    opts = opts || {};

    Bullet.call(this, opts, false);

    this._explosionCount = this.def( opts.explosionCount, 3 );
    this._childCount = this.def( opts.childCount, 3 );
    this._sector = this.def( opts.sector, 10 );

    if (render !== false) {
        this.render();
    }
}

ExplosiveBullet.prototype = Object.create(Bullet.prototype);

ExplosiveBullet.prototype.render = function() {
    Painter.circle(this, 2, "#00f");
};

ExplosiveBullet.prototype.destroy = function() {
    if (this._explosionCount > 0) {
        for (var angle = this.getAngle() - this._sector/2; angle <= this.getAngle() + this._sector/2; angle += this._sector / (this._childCount-1)) {
            gctx.addBullet(new ExplosiveBullet({
                x: this.getX(),
                y: this.getY(),
                angle: angle,
                lifeTime: this.getLifetime(),
                speed: this.getSpeed(),
                explosionCount: this._explosionCount - 1
            }));
        }
    }
};

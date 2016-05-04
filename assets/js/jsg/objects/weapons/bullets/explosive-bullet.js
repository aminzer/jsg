function ExplosiveBullet(opts, render) {
    opts = opts || {};

    this._explosionCount = meta.common.first_defined( opts.explosionCount, 2 );
    this._childCount = meta.common.first_defined( opts.childCount, 3 );
    this._sector = meta.common.first_defined( opts.sector, 10 );
    this._childBulletConstructor = meta.common.first_defined( opts.childBulletConstructor, ExplosiveBullet);

    Bullet.call(this, opts, render);
}

meta.Class( ExplosiveBullet )

    .extend_from( Bullet )

    .define_accessors([
        'explosionCount',
        'childCount',
        'sector',
        'childBulletConstructor'
    ])
    
    .define_methods({
        render: function () {
            Painter.circle(this, 2, "#00f");
        },

        getChildBulletOpts: function (angle) {
            return {
                x: this.getX(),
                y: this.getY(),
                angle: angle,
                lifeTime: this.getLifetime(),
                speed: this.getSpeed(),
                damage: this.getDamage(),
                explosionCount: this._explosionCount - 1
            };
        },

        die: function () {
            if (this._explosionCount > 0) {
                for (var angle = this.getAngle() - this._sector / 2; angle <= this.getAngle() + this._sector / 2; angle += this._sector / (this._childCount - 1)) {
                    var childBullet = new this._childBulletConstructor(
                        this.getChildBulletOpts(angle)
                    );
                    _.addBullet(childBullet);
                }
            }
        }
    })
;

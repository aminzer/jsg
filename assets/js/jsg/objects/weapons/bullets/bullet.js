function Bullet(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._damage = meta.common.first_defined( opts.damage, BULLET.DEFAULT.DAMAGE );
    this._lifetime = meta.common.first_defined( opts.lifetime, BULLET.DEFAULT.LIFETIME );

    this.setSpeed(meta.common.first_defined( opts.speed, BULLET.DEFAULT.SPEED ));
    applyAngle.call(this, opts);
    this.startMoving();

    if (render !== false) {
        this.render();
    }

    function applyAngle(opts) {
        var angle = meta.common.first_defined( opts.angle, opts.movementAngle) || 0;
        this._angle = this._movementAngle = angle;
    }
}

Extend(Bullet).from(MovingObject);

Bullet.prototype.render = function() {
    Painter.circle(this, 2, "#000");
};

Bullet.prototype.parent_move = Bullet.prototype.move;
Bullet.prototype.move = function() {
    Bullet.prototype.parent_move.call(this);
    return this.reduceLifetime() > 0;
};

Bullet.prototype.die = function() { };

Bullet.prototype.getDamage = function() {
    return this._damage;
};

Bullet.prototype.setDamage = function(damage) {
    this._damage = damage;
};

Bullet.prototype.setAngle = function(angle) {
    this._angle = this._movementAngle = angle;
};

Bullet.prototype.setMovementAngle = Bullet.prototype.setAngle;

Bullet.prototype.getLifetime = function() {
    return this._lifetime;
};

Bullet.prototype.setLifetime = function(lifetime) {
    this._lifetime = lifetime;
};

Bullet.prototype.reduceLifetime = function () {
    return --this._lifetime;
};

function Bullet(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._damage = this.def( opts.damage, BULLET.DEFAULT.DAMAGE );
    this._lifetime = this.def( opts.lifetime, BULLET.DEFAULT.LIFETIME );

    this.setSpeed(this.def( opts.speed, BULLET.DEFAULT.SPEED ));
    applyAngle.call(this, opts);
    this.startMoving();

    if (render !== false) {
        this.render();
    }

    function applyAngle(opts) {
        var angle = opts.angle || opts.movementAngle || 0;
        this._angle = this._movementAngle = angle;
    }
}

Bullet.prototype = Object.create(MovingObject.prototype);

Bullet.prototype.render = function() {
    Painter.circle(this, 2, "#000");
};

Bullet.prototype.parent_move = Bullet.prototype.move;
Bullet.prototype.move = function() {
    Bullet.prototype.parent_move.call(this);
    return --this._lifetime > 0;
};

Bullet.prototype.destroy = function() { };

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
    this._lifetime--;
};

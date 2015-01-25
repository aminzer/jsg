function Bullet(opts, draw) {
    var self = ShapedObject(opts);

    var _damage = opts.damage || BULLET_DAMAGE;
    var _speed = opts.speed || BULLET_SPEED;
    var _lifeTime = opts.lifeTime || BULLET_LIFETIME;    // depends on FPS

    var _globalBullets = opts.bullets;

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('black').drawCircle(0, 0, 2);
        self.addShape(shape);
    };

    if (draw !== false) {       // constructor's call from child
        self.draw();
    }

    self.move = function() {
        self.moveX(_speed * cos_d(self.getAngle()));
        self.moveY(_speed * sin_d(self.getAngle()));
        _lifeTime--;

        return _lifeTime > 0;
    };

    self.destroy = function() {};   // executed before bullet's death

    self.setDamage = function(damage) {
        _damage = damage;
    };

    self.getDamage = function() {
        return _damage;
    };

    self.setSpeed = function(speed) {
        _speed = speed;
    };

    self.getSpeed = function() {
        return _speed;
    };

    self.setLifeTime = function(lifeTime) {
        _lifeTime = lifeTime;
    };

    self.getLifetime = function() {
        return _lifeTime;
    };

    self.getGlobalBullets = function() {
        return _globalBullets;
    };

    return self;
}

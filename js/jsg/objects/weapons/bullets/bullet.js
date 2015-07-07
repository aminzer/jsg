function Bullet(opts, draw) {
    var self = ShapedObject(opts);

    self._damage = opts.damage || BULLET_DAMAGE;
    self._speed = opts.speed || BULLET_SPEED;
    self._lifeTime = opts.lifeTime || BULLET_LIFETIME;    // depends on FPS

    self._bullets = opts.bullets;       // reference to global bullet array

    self.draw = function() {
        Painter.circle(self, 2, "#000");
    };

    if (draw !== false) {       // constructor's call from child
        self.draw();
    }

    self.move = function() {
        self.moveX(self._speed * cos_d(self.angle));
        self.moveY(self._speed * sin_d(self.angle));
        self._lifeTime--;

        return self._lifeTime > 0;
    };

    self.destroy = function() {};   // executed before bullet's death

    return self;
}

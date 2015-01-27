function BulletReflectEffect(opts, draw) {
    var self = Effect(opts);

    var _radius = opts.radius || 100;
    var _bullets = opts.bullets;

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgba(0,50,255,0.5)").drawCircle(self.getX(), self.getY(), _radius);
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    self.makeInfluence = function() {
        if (self.haveInfluence()) {
            for (var i = 0; i < _bullets.length; i++) {
                var bullet = _bullets[i];
                if (MathUtility.isInCircle(bullet.getX(), bullet.getY(), self.getX(), self.getY(), _radius)) {
                    bullet.setAngle(bullet.getAngle() + 3);
                }
            }
        }
    };

    return self;
}

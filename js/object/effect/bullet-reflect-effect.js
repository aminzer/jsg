function BulletReflectEffect(opts, draw) {
    var self = Effect(opts);

    var _radius = opts.radius || 100;
    var _bullets = opts.bullets;

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("rgba(0,50,255,0.1)").drawCircle(0, 0, _radius);
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
                    bullet.setAngle(180 + bullet.getAngle());
                    bullet.move();

                   /* var normalAngle = MathUtility.getLinesAngle(self.getX(), self.getY(), bullet.getX(), bullet.getY());
                    console.log(normalAngle);

                    bullet.setAngle(bullet.getAngle()+(normalAngle - 180 + bullet.getAngle()));
                    bullet.move();*/
                }
            }
        }
    };

    return self;
}

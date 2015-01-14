function Rocket(opts, init) {
    var self = Bullet(opts, false);

    self.setDamage(ROCKET_DAMAGE);
    self.setSpeed(ROCKET_START_SPEED);
    self.setLifeTime(ROCKET_LIFETIME);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#999').drawRect(0, 0, 40, 6);
        shape.regX = 40;
        shape.regY = 3;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#333').drawRoundRect(0, 0, 20, 8, 3);
        shape.regX = 20;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#f00').drawRect(0, 0, 2, 8);
        shape.regX = 40;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#f00').drawRect(0, 0, 2, 8);
        shape.regX = 6;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#f00').drawRect(0, 0, 2, 8);
        shape.regX = 13;
        shape.regY = 4;
        self.addShape(shape);
    };

    if (init !== false) {
        self.init();
    }

    self.move = function() {
        self.moveX(self.getSpeed() * cos_d(self.getAngle()));
        self.moveY(self.getSpeed() * sin_d(self.getAngle()));
        self.setLifeTime(self.getLifetime() - 1);

        if (self.getLifetime() < ROCKET_START_ACCELERATION_LIFETIME && self.getLifetime() > ROCKET_END_ACCELERATION_LIFETIME) {
            self.setSpeed(self.getSpeed() + ROCKET_ACCELERATION);
        }

        return self.getLifetime() > 0;
    };

    return self;
}

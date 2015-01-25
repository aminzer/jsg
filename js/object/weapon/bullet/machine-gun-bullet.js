function MachineGunBullet(opts, draw) {
    var self = Bullet(opts, false);

    self.setDamage(MACHINE_GUN_BULLET_DAMAGE);
    self.setSpeed(MACHINE_GUN_BULLET_SPEED);
    self.setLifeTime(MACHINE_GUN_BULLET_LIFETIME);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#000').drawCircle(0, 0, 2);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#600').drawCircle(0, 0, 1);
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

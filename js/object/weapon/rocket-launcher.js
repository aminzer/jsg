function RocketLauncher(opts, draw) {
    var self = Weapon(opts);

    self.setMaxSector(ROCKET_LAUNCHER_MAX_SECTOR);
    self.setFrontLength(ROCKET_LAUNCHER_FRONT_LENGTH);
    self.setHardness(ROCKET_LAUNCHER_HARDNESS);
    self.setShootingDelay(ROCKET_LAUNCHER_SHOOTING_DELAY);
    self.setBulletConstructor(opts.bulletConstructor || ExplosiveRocket);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#244482').drawRect(0, 0, self.getFrontLength() + 30, 8);
        shape.regX = 30;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#bbb').drawRect(21, 0, 8, 10);
        shape.regX = 0;
        shape.regY = 5;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#999').drawRect(-27, 0, 12, 4);
        shape.regX = 0;
        shape.regY = 2;
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

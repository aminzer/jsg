function Recruit(opts, draw) {
    var self = Unit(opts);

    self.setWeaponConstructor(opts.weapon || GrandfathersGun);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#199EE0").drawCircle(0, 0, 20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#559').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);

        self.setWeapon(self.getWeaponConstructor()({
            stage: self.getStage(),
            bullets: self.getBullets(),
            x: opts.x,
            y: opts.y + self.getWeaponOffsetY
        }));
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

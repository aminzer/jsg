function GuyWithPanzerschreck(opts, draw) {
    var self = Unit(opts);

    self.setWeaponConstructor(RocketLauncher);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#8D91E3").drawCircle(0, 0, 20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#34378A').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);

        self.setWeapon(self.getWeaponConstructor()({
            stage: self.getStage(),
            bullets: self.getBullets()
        }));
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

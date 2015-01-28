function FootSoldier(opts, draw) {
    var self = Unit(opts);

    self.setWeapon(AutomaticGun({
        stage: self.getStage(),
        bullets: self.getBullets()
    }));

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#559").drawCircle(0, 0, 20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#199EE0').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

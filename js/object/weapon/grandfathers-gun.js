function GrandfathersGun(opts, draw) {
    var self = new Weapon(opts);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#444').drawRect(0, 0, self.getFrontLength() + 15, 5);
        shape.regX = 15;
        shape.regY = 2.5;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#999').drawRect(0, 0, self.getFrontLength(), 2);
        shape.regX = 10;
        shape.regY = 1;
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
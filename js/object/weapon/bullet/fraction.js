function Fraction(opts, draw) {
    var self = Bullet(opts, false);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#f00').drawRect(0, 0, 3, 3);
        shape.regX = 1.5;
        shape.regY = 1.5;
        self.addShape(shape);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

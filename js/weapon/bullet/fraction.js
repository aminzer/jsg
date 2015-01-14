function Fraction(opts, init) {
    var self = Bullet(opts, false);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#f00').drawRect(0, 0, 3, 3);
        shape.regX = 1.5;
        shape.regY = 1.5;
        self.addShape(shape);
    };

    if (init !== false) {
        self.init();
    }

    return self;
}

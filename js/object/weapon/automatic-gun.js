function AutomaticGun(opts, init) {
    var self = AutomaticWeapon(opts);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#555').drawRect(0, 0, self.getFrontLength() + 15, 5);
        shape.regX = 15;
        shape.regY = 2.5;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#691C1C').drawRect(0, 0, 10, 5);
        shape.regX = -7;
        shape.regY = 0;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#ddd').drawRect(0, 0, self.getFrontLength(), 2);
        shape.regX = 10;
        shape.regY = 1;
        self.addShape(shape);
    };

    if (init !== false) {
        self.init();
    }

    return self;
}
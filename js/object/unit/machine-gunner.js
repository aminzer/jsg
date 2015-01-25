function MachineGunner(opts, draw) {
    var self = Unit(opts);

    self.setWeaponConstructor(opts.weapon || MachineGun);

    self.draw = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#E08A19").drawCircle(0, 0, 20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#7A4D11').drawRect(0, 0, 10, 38);
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

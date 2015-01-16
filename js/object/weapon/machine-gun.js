function MachineGun(opts, init) {
    var self = AutomaticWeapon(opts, false);

    self.setRateOfFire(MACHINE_GUN_RATE_OF_FIRE);
    self.setMaxSector(MACHINE_GUN_MAX_SECTOR);
    self.setFrontLength(MACHINE_GUN_FRONT_LENGTH);
    self.setHardness(MACHINE_GUN_HARDNESS);
    self.setBulletConstructor(MachineGunBullet);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#8A8A8A').drawRect(0, 0, self.getFrontLength() + 20, 4);
        shape.regX = 20;
        shape.regY = 2;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#444').drawRect(0, 0, 20, 10);
        shape.regX = 10;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#444').drawRect(0, 0, 7, 8);
        shape.regX = 20;
        shape.regY = 4;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#222').drawRect(0, 0, 10, 4);
        shape.regX = -30;
        shape.regY = 2;
        self.addShape(shape);
    };

    if (init !== false) {
        self.init();
    }

    return self;
}

function Player(opts, draw) {
    var self = Unit(opts, false);

    var _weaponArsenal = [];
    var _weaponIndex = 0;

    self.draw = function() {
        self.setDynamicObjects(opts.dynamicObjects);

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#73B500").drawCircle(0,0,20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#345200').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);

        /*shape = new createjs.Shape();
         shape.graphics.beginFill('#559').arc(-20, 5, 50, -1, 0);
         self.addShape(shape);*/

        _weaponArsenal.push(GrandfathersGun({
            stage: self.getStage(),
            bullets: self.getBullets()
        }));

        _weaponArsenal.push(AutomaticGun({
            stage: self.getStage(),
            bullets: self.getBullets()
        }, false));

        _weaponArsenal.push(MachineGun({
            stage: self.getStage(),
            bullets: self.getBullets()
        }, false));

        _weaponArsenal.push(RocketLauncher({
            stage: self.getStage(),
            bullets: self.getBullets()
        }, false));

        _weaponArsenal.push(CompositeWeapon({
            stage: self.getStage(),
            bullets: self.getBullets(),
            weaponConstructors: [MachineGun, MachineGun],
            weaponOffsetsY: [15, -15]
        }, false));

        self.setWeapon(_weaponArsenal[_weaponIndex]);
    };

    if (draw !== false) {
        self.draw();
    }

    self.changeWeapon = function(direction) {    // mouse wheel forward(1) or backward (-1)
        self.getWeapon().destroyShapes();        // erase from stage

        direction = direction ? direction : 1;   // default value
        _weaponIndex += direction;

        if (_weaponIndex < 0) {
            _weaponIndex = _weaponArsenal.length - 1;
        }

        if (_weaponIndex > _weaponArsenal.length - 1) {
            _weaponIndex = 0;
        }

        self.setWeapon(_weaponArsenal[_weaponIndex]);
        self.getWeapon().draw();           // draw on stage
    };

    self.getObjectType = function() {
        return OBJECT_TYPE_UNIT;
    };

    return self;
}

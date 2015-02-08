function Player(opts, draw) {
    var self = Unit(opts, false);

    var _weaponArsenal = [];
    var _weaponIndex = 0;

    initArsenal();

    self.draw = function() {
        Painter.circle(self, UNIT_RADIUS, "#73B500");
        Painter.rectangle(self, 10, 38, 5, 19, "#345200");

        self.getWeapon().draw();
    };

    if (draw !== false) {
        self.draw();
    }

    // @Override
    self.p_takeDamage = self.takeDamage;
    self.takeDamage = function(damage) {
        self.p_takeDamage(damage);
        $(document).trigger('player_take_damage', [self.getHp(), self.getMaxHp()]);
    };

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

    function initArsenal() {
        _weaponArsenal.push(GrandfathersGun({
            stage: self.getStage(),
            bullets: self.getBullets()
        }, false));

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
            weaponOffsetsY: [15, -15],
            weaponOffsetsX: [0, 0]
        }, false));

        self.setWeapon(_weaponArsenal[_weaponIndex]);
    }

    return self;
}

function Player(opts, draw) {
    var self = Unit(opts);

    self._unitType = UNIT_TYPE.PLAYER;
    self._speed = opts.speed || PLAYER.SPEED;
    self.setMaxHp(opts.hp || PLAYER.HP);

    var _weaponArsenal = [];
    var _weaponIndex = 0;

    initArsenal();

    self.draw = function() {
        Painter.circle(self, self._radius, "#73B500");
        Painter.rectangle(self, 10, 2 * (self._radius - 1), 5, self._radius - 1, "#345200");

        self._weapon.draw();
    };

    if (draw !== false) {
        self.draw();
    }

    self.setWeapon = function(index) {
        self._weapon.destroyShapes();

        _weaponIndex = index;

        if (_weaponIndex < 0) {
            _weaponIndex = _weaponArsenal.length - 1;
        }

        if (_weaponIndex > _weaponArsenal.length - 1) {
            _weaponIndex = 0;
        }

        self._weapon = _weaponArsenal[_weaponIndex];
        self._weapon.draw();
    };

    self.changeWeapon = function(direction) {    // mouse wheel forward(1) or backward (-1)
        self.setWeapon(_weaponIndex + (direction ? direction : 1));
    };

    function initArsenal() {
        _weaponArsenal.push(GrandfathersGun({
            stage: self._stage,
            bullets: self._bullets
        }, false));

        _weaponArsenal.push(AutomaticGun({
            stage: self._stage,
            bullets: self._bullets
        }, false));

        _weaponArsenal.push(MachineGun({
            stage: self._stage,
            bullets: self._bullets
        }, false));

        _weaponArsenal.push(RocketLauncher({
            stage: self._stage,
            bullets: self._bullets
        }, false));

        _weaponArsenal.push(CompositeWeapon({
            stage: self._stage,
            bullets: self._bullets,
            weaponConstructors: [MachineGun, MachineGun],
            weaponOffsetsY: [15, -15],
            weaponOffsetsX: [0, 0]
        }, false));

        self._weapon = _weaponArsenal[_weaponIndex];
    }

    return self;
}

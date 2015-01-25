function CompositeWeapon(opts, draw) {
    var self = AutomaticWeapon(opts);

    var _weapons = [];
    initWeapons(opts.weaponConstructors, opts.weaponOffsetsY);

    function initWeapons(weaponConstructors, weaponOffsetsY) {
        _weapons = [];
        for (var i = 0; i < weaponConstructors.length; i++) {
            _weapons.push(weaponConstructors[i]({
                stage: opts.stage,
                bullets: opts.bullets,
                weaponOffsetY: weaponOffsetsY[i]
            }, draw));
        }
    }

    self.draw = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].draw();
        }
    };

    if (draw !== false) {
        self.draw();
    }

    self.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].setAngle(MathUtility.getLinesAngle(
                unitX - _weapons[i].getWeaponOffsetY() * sin_d(unitAngle) + _weapons[i].getWeaponOffsetX() * cos_d(unitAngle),
                unitY + _weapons[i].getWeaponOffsetY() * cos_d(unitAngle) + _weapons[i].getWeaponOffsetX() * sin_d(unitAngle),
                targetX,
                targetY
            ));

            _weapons[i].setX(unitX - _weapons[i].getWeaponOffsetY() * sin_d(unitAngle) + _weapons[i].getWeaponOffsetX() * cos_d(unitAngle));
            _weapons[i].setY(unitY + _weapons[i].getWeaponOffsetY() * cos_d(unitAngle) + _weapons[i].getWeaponOffsetX() * sin_d(unitAngle));
        }
    };

    self.shoot = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].shoot();
        }
    };

    self.startShooting = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].startShooting();
        }
    };

    self.stopShooting = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].stopShooting();
        }
    };

    self.updateShapes = function() {            // update own shapes and start updating of children
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].updateShapes();
        }
    };

    self.destroyShapes = function() {            // destroy own shapes and start destroying of children
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].destroyShapes();
        }
    };

    return self;
}

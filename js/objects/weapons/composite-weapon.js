function CompositeWeapon(opts, draw) {
    var self = AutomaticWeapon(opts);

    var _weapons = [];
    initWeapons(opts.weaponConstructors, opts.weaponOffsetsY, opts.weaponOffsetsX);

    function initWeapons(weaponConstructors, weaponOffsetsY, weaponOffsetsX) {
        _weapons = [];
        for (var i = 0; i < weaponConstructors.length; i++) {
            _weapons.push(weaponConstructors[i]({
                stage: opts.stage,
                bullets: opts.bullets,
                weaponOffsetY: weaponOffsetsY[i],
                weaponOffsetX: weaponOffsetsX[i]
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
            _weapons[i].angle = MathUtility.getLinesAngle(
                unitX - _weapons[i]._weaponOffsetY * sin_d(unitAngle) + _weapons[i]._weaponOffsetX * cos_d(unitAngle),
                unitY + _weapons[i]._weaponOffsetY * cos_d(unitAngle) + _weapons[i]._weaponOffsetX * sin_d(unitAngle),
                targetX,
                targetY
            );

            _weapons[i].x = unitX - _weapons[i]._weaponOffsetY * sin_d(unitAngle) + _weapons[i]._weaponOffsetX * cos_d(unitAngle);
            _weapons[i].y = unitY + _weapons[i]._weaponOffsetY * cos_d(unitAngle) + _weapons[i]._weaponOffsetX * sin_d(unitAngle);
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

    self.updateShapes = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].updateShapes();
        }
    };

    self.destroyShapes = function() {
        for (var i = 0; i < _weapons.length; i++) {
            _weapons[i].destroyShapes();
        }
    };

    return self;
}

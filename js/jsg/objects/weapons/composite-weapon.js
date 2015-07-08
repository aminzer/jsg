function CompositeWeapon(opts, draw) {
    var self = ShapedObject(opts);

    var _weapons = [];
    initWeapons(opts.weaponConstructors, opts.weaponOffsetsY, opts.weaponOffsetsX);

    function initWeapons(weaponConstructors, weaponOffsetsY, weaponOffsetsX) {
        _weapons = [];
        weaponConstructors.forEach(function(weaponConstructor, i) {
            _weapons.push(weaponConstructor({
                stage: opts.stage,
                bullets: opts.bullets,
                weaponOffsetY: weaponOffsetsY[i],
                weaponOffsetX: weaponOffsetsX[i]
            }, draw));
        });
    }

    self.draw = function() {
        _weapons.forEach(function(weapon) {
            weapon.draw();
        });
    };

    if (draw !== false) {
        self.draw();
    }

    self.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
        _weapons.forEach(function(weapon) {
            weapon.angle = MathUtility.getLinesAngle(
                unitX - weapon._weaponOffsetY * sin_d(unitAngle) + weapon._weaponOffsetX * cos_d(unitAngle),
                unitY + weapon._weaponOffsetY * cos_d(unitAngle) + weapon._weaponOffsetX * sin_d(unitAngle),
                targetX,
                targetY
            );

            weapon.x = unitX - weapon._weaponOffsetY * sin_d(unitAngle) + weapon._weaponOffsetX * cos_d(unitAngle);
            weapon.y = unitY + weapon._weaponOffsetY * cos_d(unitAngle) + weapon._weaponOffsetX * sin_d(unitAngle);
        });
    };

    self.shoot = function() {
        _weapons.forEach(function(weapon) {
            weapon.shoot();
        });
    };

    self.startShooting = function() {
        _weapons.forEach(function(weapon) {
            weapon.startShooting();
        });
    };

    self.stopShooting = function() {
        _weapons.forEach(function(weapon) {
            weapon.stopShooting();
        });
    };

    self.fix = function() {
        _weapons.forEach(function(weapon) {
            weapon.fix();
        });
    };

    self.updateShapes = function() {
        _weapons.forEach(function(weapon) {
            weapon.updateShapes();
        });
    };

    self.destroyShapes = function() {
        _weapons.forEach(function(weapon) {
            weapon.destroyShapes();
        });
    };

    return self;
}

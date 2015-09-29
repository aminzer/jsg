function CompositeWeapon(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._weapons = this.def( opts.weapons, []);
    if (this._weapons.length == 0) {
        initWeapons.call(this, opts.weaponConstructors, opts.offsetsY || [], opts.offsetsX || []);
    }

    if (render !== false) {
        this.render();
    }

    function initWeapons(weaponConstructors, offsetsY, offsetsX) {
        var self = this;
        weaponConstructors.forEach(function(weaponConstructor, i) {
            self._weapons.push(new weaponConstructor({
                offsetY: offsetsY[i] || 0,
                offsetX: offsetsX[i] || 0
            }, false));
        });
    }
}

CompositeWeapon.prototype = Object.create(MovingObject.prototype);

CompositeWeapon.prototype.render = function() {
    this._weapons.forEach(function(weapon) {
        weapon.render();
    });
};

CompositeWeapon.prototype.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
    this._weapons.forEach(function(weapon) {
        weapon.aimAt(targetX, targetY, unitX, unitY, unitAngle);
    });
};

CompositeWeapon.prototype.shoot = function() {
    this._weapons.forEach(function(weapon) {
        weapon.shoot();
    });
};

CompositeWeapon.prototype.startShooting = function() {
    this._weapons.forEach(function(weapon) {
        weapon.startShooting();
    });
};

CompositeWeapon.prototype.stopShooting = function() {
    this._weapons.forEach(function(weapon) {
        weapon.stopShooting();
    });
};

CompositeWeapon.prototype.fix = function() {
    this._weapons.forEach(function(weapon) {
        weapon.fix();
    });
};

CompositeWeapon.prototype.updateShapes = function() {
    this._weapons.forEach(function(weapon) {
        weapon.updateShapes();
    });
};

CompositeWeapon.prototype.destroyShapes = function() {
    this._weapons.forEach(function(weapon) {
        weapon.destroyShapes();
    });
};

function CompositeWeapon(opts, render) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._weapons = meta.common.first_defined( opts.weapons, []);
    if (this._weapons.length == 0) {
        initWeapons.call(this, opts.weaponConstructors, opts.offsetsY || [], opts.offsetsX || []);
    }

    if (render !== false) {
        this.render();
    }

    function initWeapons(weaponConstructors, offsetsY, offsetsX) {
        var self = this;
        weaponConstructors.forEach(function (weaponConstructor, i) {
            self._weapons.push(new weaponConstructor({
                offsetY: offsetsY[i] || 0,
                offsetX: offsetsX[i] || 0
            }, false));
        });
    }
}

new meta.Class( CompositeWeapon )

    .extend_from( MovingObject )

    .define({
        render: function () {
            this._weapons.forEach(function (weapon) {
                weapon.render();
            });
        },

        aimAt: function (targetX, targetY, unitX, unitY, unitAngle) {
            this._weapons.forEach(function (weapon) {
                weapon.aimAt(targetX, targetY, unitX, unitY, unitAngle);
            });
        },

        shoot: function () {
            this._weapons.forEach(function (weapon) {
                weapon.shoot();
            });
        },

        startShooting: function () {
            this._weapons.forEach(function (weapon) {
                weapon.startShooting();
            });
        },

        stopShooting: function () {
            this._weapons.forEach(function (weapon) {
                weapon.stopShooting();
            });
        },

        fix: function () {
            this._weapons.forEach(function (weapon) {
                weapon.fix();
            });
        },

        updateShapes: function () {
            this._weapons.forEach(function (weapon) {
                weapon.updateShapes();
            });
        },

        destroyShapes: function () {
            this._weapons.forEach(function (weapon) {
                weapon.destroyShapes();
            });
        }
    })
;

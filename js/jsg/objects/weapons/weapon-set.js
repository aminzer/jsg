function WeaponSet(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._weapons = this.def( opts.weapons, [] );
    this._weaponIndex = 0;
    this._currentWeapon = this.chooseWeapon(this._weaponIndex);
}

Extend(WeaponSet).from(BaseObject);

WeaponSet.prototype.getCurrentWeapon = function() {
    return this._currentWeapon;
};

WeaponSet.prototype.chooseWeapon = function(index) {
    this._weaponIndex = index;

    if (this._weaponIndex < 0) {
        this._weaponIndex = 0;
    }

    if (this._weaponIndex > this._weapons.length - 1) {
        this._weaponIndex = this._weapons.length - 1;
    }

    if (this._weaponIndex < 0 || this._weaponIndex >= this._weapons.length) {
        this._currentWeapon = null;
        return;
    }

    this._currentWeapon = this._weapons[this._weaponIndex];
};

WeaponSet.prototype.chooseNextWeapon = function() {
    this.chooseWeapon(this._weaponIndex + 1);
};

WeaponSet.prototype.choosePrevWeapon = function() {
    this.chooseWeapon(this._weaponIndex - 1);
};

WeaponSet.prototype.addWeapon = function(weapon) {
    this._weapons.push(weapon);
};

WeaponSet.prototype.getWeapons = function() {
    return this._weapons;
};

WeaponSet.prototype.setWeapons = function(weapons) {
    this._weapons = weapons;
};

// fabric
WeaponSet.oneGun = function(weapon) {
    return new WeaponSet({
        weapons: [weapon]
    })
};

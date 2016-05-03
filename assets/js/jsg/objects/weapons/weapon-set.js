function WeaponSet(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._weapons = meta.common.first_defined( opts.weapons, [] );
    this._weaponIndex = 0;
    this._currentWeapon = this.chooseWeapon(this._weaponIndex);
}

meta.Class( WeaponSet)

    .extend_from( BaseObject )

    .define_reader([
        'weapons',
        'currentWeapon'
    ])

    .define_methods({
        chooseWeapon: function(index) {
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
        },

        chooseNextWeapon: function () {
            this.chooseWeapon(this._weaponIndex + 1);
        },

        choosePrevWeapon: function () {
            this.chooseWeapon(this._weaponIndex - 1);
        },

        addWeapon: function(weapon) {
            this._weapons.push(weapon);
        },

        oneGun: function(weapon) {
            return new WeaponSet({
                weapons: [weapon]
            })
        }
    })

    .define_static_method({
        oneGun: function (weapon) {
            return new WeaponSet({
                weapons: [weapon]
            })
        }
    })
;

function Unit(opts) {
    opts = new meta.Hash( opts ).merge({
        objectType: OBJECT_TYPE.ENEMY,
        speed: UNIT.DEFAULT.SPEED
    }).to_obj();

    MovingObject.call(this, opts);

    this._maxHp = meta.common.first_defined( opts.maxHp, UNIT.DEFAULT.HP );
    this._hp = meta.common.first_defined( opts.hp, this._maxHp );

    this._weaponSet = meta.common.first_defined( opts.weaponSet || new WeaponSet() );
    this.chooseWeapon(0);
}

meta.Class( Unit )

    .extend_from( MovingObject )

    .define_accessors([
        'hp'
    ])

    .define_accessors('maxHp', {
        set: function (maxHp) {
            this._maxHp = this._hp = maxHp;
        }
    })

    .define_accessors('weaponSet', {
        set: function (weaponSet) {
            this._weaponSet = weaponSet;
            this.chooseWeapon(0);
        }
    })

    .define_reader('weapon', function () {
        return this._weaponSet.currentWeapon;
    })

    .define_methods({
        hasWeapon: function () {
            return this.weapon != null;
        },

        chooseWeapon: function (index) {
            if (this.hasWeapon()) {
                this.weapon.destroyShapes();
            }
            this._weaponSet.chooseWeapon(index);
            if (this.hasWeapon()) {
                this.weapon.render();
            }
        },

        chooseNextWeapon: function () {
            if (this.hasWeapon()) {
                this.weapon.destroyShapes();
            }
            this._weaponSet.chooseNextWeapon();
            if (this.hasWeapon()) {
                this.weapon.render();
            }
        },

        choosePrevWeapon: function () {
            if (this.hasWeapon()) {
                this.weapon.destroyShapes();
            }
            this._weaponSet.choosePrevWeapon();
            if (this.hasWeapon()) {
                this.weapon.render();
            }
        },

        aimAt: function (targetX, targetY) {
            this.angle = MathUtility.getLinesAngle(this.x, this.y, targetX, targetY);
            if (this.hasWeapon()) {
                this.weapon.aimAt(targetX, targetY, this.x, this.y, this.angle);
            }
        },

        shoot: function () {
            if (this.hasWeapon()) {
                this.weapon.shoot();
            }
        },

        startShooting: function () {
            if (this.hasWeapon()) {
                this.weapon.startShooting();
            }
        },

        stopShooting: function () {
            if (this.hasWeapon()) {
                this.weapon.stopShooting();
            }
        },

        takeDamage: function (damage) {
            this._hp -= damage;
        },

        isAlive: function () {
            return this._hp > 0;
        }
    })

    .override_methods({
        updateShapes: function () {
            Unit.prototype.parent_updateShapes.call(this);
            if (this.hasWeapon()) {
                this.weapon.updateShapes();
            }
        },

        destroyShapes: function () {
            Unit.prototype.parent_destroyShapes.call(this);
            if (this.hasWeapon()) {
                this.weapon.destroyShapes();
            }
        }
    })
;

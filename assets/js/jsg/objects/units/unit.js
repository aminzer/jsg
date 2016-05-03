function Unit(opts) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        objectType: OBJECT_TYPE.ENEMY,
        speed: UNIT.DEFAULT.SPEED
    });

    MovingObject.call(this, opts);

    this._maxHp = meta.common.first_defined( opts.maxHp, UNIT.DEFAULT.HP );
    this._hp = meta.common.first_defined( opts.hp, this._maxHp );

    this._weaponSet = meta.common.first_defined( opts.weaponSet || new WeaponSet({}) );
    this.chooseWeapon(0);
}

meta.Class( Unit )

    .extend_from( MovingObject )

    .define_accessors([
        'hp'
    ])

    .define_reader('maxHp')
    .define_writer('maxHp', function (maxHp) {
        this._maxHp = this._hp = maxHp;
    })

    .define_reader('weaponSet')
    .define_writer('weaponSet', function (maxHp) {
        this._weaponSet = weaponSet;
        this.chooseWeapon(0);
    })

    .define_methods({
        getWeapon: function () {
            return this._weaponSet.getCurrentWeapon();
        },

        hasWeapon: function () {
            return this.getWeapon() != null;
        },

        chooseWeapon: function (index) {
            if (this.hasWeapon()) {
                this.getWeapon().destroyShapes();
            }
            this._weaponSet.chooseWeapon(index);
            if (this.hasWeapon()) {
                this.getWeapon().render();
            }
        },

        chooseNextWeapon: function () {
            if (this.hasWeapon()) {
                this.getWeapon().destroyShapes();
            }
            this._weaponSet.chooseNextWeapon();
            if (this.hasWeapon()) {
                this.getWeapon().render();
            }
        },

        choosePrevWeapon: function () {
            if (this.hasWeapon()) {
                this.getWeapon().destroyShapes();
            }
            this._weaponSet.choosePrevWeapon();
            if (this.hasWeapon()) {
                this.getWeapon().render();
            }
        },

        aimAt: function (targetX, targetY) {
            this.setAngle( MathUtility.getLinesAngle(this.getX(), this.getY(), targetX, targetY) );
            if (this.hasWeapon()) {
                this.getWeapon().aimAt(targetX, targetY, this.getX(), this.getY(), this.getAngle());
            }
        },

        shoot: function () {
            if (this.hasWeapon()) {
                this.getWeapon().shoot();
            }
        },

        startShooting: function () {
            if (this.hasWeapon()) {
                this.getWeapon().startShooting();
            }
        },

        stopShooting: function () {
            if (this.hasWeapon()) {
                this.getWeapon().stopShooting();
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
            Unit.prototype.parentMethod_updateShapes.call(this);
            if (this.hasWeapon()) {
                this.getWeapon().updateShapes();
            }
        },

        destroyShapes: function () {
            Unit.prototype.parentMethod_destroyShapes.call(this);
            if (this.hasWeapon()) {
                this.getWeapon().destroyShapes();
            }
        }
    })
;

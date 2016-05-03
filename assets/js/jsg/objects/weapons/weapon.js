function Weapon(opts) {
    opts = opts || {};

    MovingObject.call(this, opts);

    this._frontLength = meta.common.first_defined( opts.frontLength, WEAPON.DEFAULT.FRONT_LENGTH );
    this._offsetY = meta.common.first_defined( opts.offsetY, UNIT.DEFAULT.RADIUS - 5 );
    this._offsetX = meta.common.first_defined( opts.offsetX, 0 );

    this._hardness = meta.common.first_defined( opts.hardness, WEAPON.DEFAULT.HARDNESS );        // max number of bullets to completely reduce the accuracy
    this._state = meta.common.first_defined( opts.state, this._hardness );                       // current number of bullets to reduce the accuracy
    this._maxSector = meta.common.first_defined( opts.maxSector, WEAPON.DEFAULT.MAX_SECTOR );    // if accuracy = 0, bullets will be in this sector (degrees)

    this._shootingDelay = meta.common.first_defined( opts.shootingDelay, WEAPON.DEFAULT.SHOOTING_DELAY );  // min time interval between 2 shots
    this._canMakeNextShot = true;                                                        // to prevent shooting until shooting delay finished

    this._charger = meta.common.first_defined( opts.charger, new Charger(opts) );
}

meta.Class( Weapon )
    
    .extend_from( MovingObject )
    
    .define_methods({
        getAccuracy: function () {
            return this._state / this._hardness;
        },

        harmWeapon: function () {
            if (this._state > 0) {
                this._state--;
            }
        },

        shoot: function () {
            var bullet = this._charger.getNextBullet();
            if (bullet !== null) {
                bullet.setX(this.getX() + this._frontLength * cos_d(this.getAngle()));
                bullet.setY(this.getY() + this._frontLength * sin_d(this.getAngle()));
                bullet.setAngle(this.getAngle() + (1 - this.getAccuracy()) * (this._maxSector * random() - this._maxSector / 2));
                this.harmWeapon();
                _.addBullet(bullet);
            }
            return bullet;
        },

        canMakeNextShot: function () {
            return this._canMakeNextShot;
        },

        allowMakeNextShot: function () {
            this._canMakeNextShot = true;
        },

        forbidMakeNextShot: function () {
            this._canMakeNextShot = false;
        },

        startShooting: function () {
            if (this.canMakeNextShot()) {
                this.shoot();

                this.forbidMakeNextShot();
                setTimeout(this.allowMakeNextShot.bind(this), this._shootingDelay);
            }
        },

        stopShooting: function () {
        },

        fix: function () {
            this._state = this._hardness;
        },

        aimAt: function(targetX, targetY, unitX, unitY, unitAngle) {
            this.setAngle(MathUtility.getLinesAngle(
                unitX - this._offsetY * sin_d(unitAngle) + this._offsetX * cos_d(unitAngle),
                unitY + this._offsetY * cos_d(unitAngle) + this._offsetX * sin_d(unitAngle),
                targetX,
                targetY
            ));

            this.setX(unitX - this._offsetY * sin_d(unitAngle) + this._offsetX * cos_d(unitAngle));
            this.setY(unitY + this._offsetY * cos_d(unitAngle) + this._offsetX * sin_d(unitAngle));
        }
    })

    .override_method({
        destroyShapes: function () {
            this.stopShooting();
            Weapon.prototype.parentMethod_destroyShapes.call(this);
        }
    })

    .define_accessors([
        'frontLength',
        'offsetX',
        'offsetY',
        'maxSector',
        'shootingDelay',
        'charger'
    ])

    .define_reader('hardness')
    .define_writer('hardness', function(hardness) {
        this._state = this._hardness = hardness;
    })

    .define_reader('rateOfFire', function () {
        return 60000 / this._shootingDelay;
    })
    .define_writer('rateOfFire', function(rateOfFire) {
        this._shootingDelay = 60000 / rateOfFire;
    })
;
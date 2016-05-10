function AutomaticWeapon(opts) {
    opts = opts || {};

    Weapon.call(this, opts);

    this._shootingTimer = null;

    this.rateOfFire = meta.common.first_defined( opts.rateOfFire, WEAPON.DEFAULT.AUTOMATIC.RATE_OF_FIRE );
}

meta.Class( AutomaticWeapon )

    .extend_from( Weapon )

    .define_methods({
        startShooting: function () {
            if (this.canMakeNextShot() && this._shootingTimer == null) {
                this.shoot();
                this._shootingTimer = setInterval(this.shoot.bind(this), this.shootingDelay);

                this.forbidMakeNextShot();        // to forbid shoot faster than rateOfFire (fast clicking)
                setTimeout(this.allowMakeNextShot.bind(this), this.shootingDelay);
            }
        },

        stopShooting: function () {
            clearInterval(this._shootingTimer);
            this._shootingTimer = null;
        }
    })
;

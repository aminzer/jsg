function AutomaticWeapon(opts) {
    opts = opts || {};

    Weapon.call(this, opts);

    this._shootingTimer = null;

    this.setRateOfFire(this.def(opts.rateOfFire, WEAPON.DEFAULT.AUTOMATIC.RATE_OF_FIRE) );
}

AutomaticWeapon.prototype = Object.create(Weapon.prototype);

AutomaticWeapon.prototype.startShooting = function() {
    if (this.canMakeNextShot() && this._shootingTimer == null) {
        var self = this;

        this.shoot();
        this._shootingTimer = setInterval(function () {
            self.shoot();
        }, this.getShootingDelay());

        this.forbidMakeNextShot();        // to forbid shoot faster than rateOfFire (fast clicking)
        setTimeout(function() {
            self.allowMakeNextShot();
        }, this.getShootingDelay());
    }
};

AutomaticWeapon.prototype.stopShooting = function() {
    clearInterval(this._shootingTimer);
    this._shootingTimer = null;
};

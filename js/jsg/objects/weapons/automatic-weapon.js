function AutomaticWeapon(opts) {
    var self = Weapon(opts);

    self._rateOfFire = WEAPON.DEFAULT.AUTOMATIC.RATE_OF_FIRE;        // shots per minute
    self._shootingDelay = 60000 / self._rateOfFire;

    var _shootingTimer = null;                              // shoots every 60000 / self._rateOfFire ms

    self.startShooting = function() {
        if (self._isShootingAllowed() && _shootingTimer == null) {
            self.shoot();
            _shootingTimer = setInterval(function () {
                self.shoot();
            }, 60000 / self._rateOfFire);

            self._forbidShoot();        // to forbid shoot faster than rateOfFire (fast clicking)
            setTimeout(function() {
                self._allowShoot();
            }, self._shootingDelay);
        }
    };

    self.stopShooting = function() {
        clearInterval(_shootingTimer);
        _shootingTimer = null;
    };

    return self;
}

function AutomaticWeapon(opts) {
    var self = Weapon(opts);

    var _rateOfFire = AUTOMATIC_WEAPON_RATE_OF_FIRE;        // shots per minute
    var _shootingTimer = null;                              // shoots every 60000 / _rateOfFire ms

    self.setShootingDelay(60000 / _rateOfFire);

    self.startShooting = function() {
        if (self.isShootingAllowed() && _shootingTimer == null) {
            self.shoot();
            _shootingTimer = setInterval(function () {
                self.shoot();
            }, 60000 / _rateOfFire);

            self.forbidShoot();
            setTimeout(function() {
                self.allowShoot();
            }, self.getShootingDelay());
        }
    };

    self.stopShooting = function() {
        clearInterval(_shootingTimer);
        _shootingTimer = null;
    };

    self.setRateOfFire = function(rateOfFire) {
        _rateOfFire = rateOfFire;
    };

    self.getRateOfFire = function() {
        return _rateOfFire;
    };

    return self;
}

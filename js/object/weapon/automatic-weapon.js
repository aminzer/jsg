function AutomaticWeapon(opts, init) {
    var self = Weapon(opts, false);

    var _rateOfFire = AUTOMATIC_WEAPON_RATE_OF_FIRE;        // shots per minute
    var _shootingTimer = null;                              // shoots every 60000 / _rateOfFire ms

    self.setShootingDelay(60000 / _rateOfFire);

    self.init = function() {
        var body = new createjs.Shape();
        body.graphics.beginFill('#8F3232').drawRect(0, 0, self.getFrontLength() + 15, 5);
        body.regX = 15;
        body.regY = 2.5;
        self.addShape(body);
    };

    if (init !== false) {
        self.init();
    }

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
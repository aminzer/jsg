function AutomaticWeapon(opts, init) {
    var self = Weapon(opts, false);

    var _rateOfFire = AUTOMATIC_WEAPON_RATE_OF_FIRE;        // shots per minute
    var _shootingTimer = null;                              // shoots every 60000 / _rateOfFire ms

    self.setShootingDelay(60000 / _rateOfFire);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill('#555').drawRect(0, 0, self.getFrontLength() + 15, 5);
        shape.regX = 15;
        shape.regY = 2.5;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#691C1C').drawRect(0, 0, 10, 5);
        shape.regX = -7;
        shape.regY = 0;
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#ddd').drawRect(0, 0, self.getFrontLength(), 2);
        shape.regX = 10;
        shape.regY = 1;
        self.addShape(shape);
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
function AutomaticWeapon(opts, init) {
    var self = Weapon(opts, false);

    // TODO change to rate of fire
    var _shootingDelay = AUTOMATIC_WEAPON_SHOOTING_DELAY;    // delay between two bullets
    var _shootingTimer = null;                               // shoots every _shootingDelay ms

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
        if (_shootingTimer == null) {
            self.shoot();
            _shootingTimer = setInterval(function() {
                self.shoot();
            }, _shootingDelay);
        }
    };

    self.stopShooting = function() {
        clearInterval(_shootingTimer);
        _shootingTimer = null;
    };

    self.setShootingDelay = function(delay) {
        _shootingDelay = delay;
    };

    self.getShootingDelay = function() {
        return _shootingDelay;
    };

    return self;
}
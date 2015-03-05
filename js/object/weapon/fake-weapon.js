function FakeWeapon(opts) {
    var self = Weapon(opts);

    self.draw = function() {};

    self.shoot = function() {};

    self.startShooting = function() {};

    self.stopShooting = function() {};

    return self;
}

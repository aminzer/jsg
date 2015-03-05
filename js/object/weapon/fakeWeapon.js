function FakeWeapon(opts, draw) {
    var self = Weapon(opts);

    self._maxSector = 0;
    self._frontLength = 0;
    self._hardness = 0;
    self._shootingDelay = 0;
    self._bulletConstructor = opts.bulletConstructor || FakeBullet;
    self._weaponOffsetY = 0;
    self._weaponOffsetX = 0;

    self.draw = function() {
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

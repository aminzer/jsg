function Weapon(opts) {
    var self = ShapedObject(opts);
    
    self._frontLength = WEAPON.DEFAULT.FRONT_LENGTH;                       // influence on bullets start coordinates
    self._weaponOffsetY = opts.weaponOffsetY || UNIT.DEFAULT.RADIUS - 5;   // offset between weapon's and unit's centers
    self._weaponOffsetX = opts.weaponOffsetX || 0;

    self._hardness = WEAPON.DEFAULT.HARDNESS;             // max number of bullets to reduce the accuracy
    self._state = self._hardness;                 // current number of bullets to reduce the accuracy
    self._maxSector = WEAPON.DEFAULT.MAX_SECTOR;          // if accuracy = 0, bullets will be in this sector (degrees)

    self._bullets = opts.bullets;           // reference to global bullet array

    self._shootingDelay = WEAPON.DEFAULT.SHOOTING_DELAY;  // min time interval between 2 shots
    self._canShoot = true;

    self._charger = opts.charger || Charger(opts);

    self.shoot = function() {
        if (self._charger.isEmpty()) return;

        var bullet = self._charger.getBullet();
        bullet.x = self.x + self._frontLength * cos_d(self.angle);
        bullet.y = self.y + self._frontLength * sin_d(self.angle);
        bullet.angle = self.angle + (1 - self._getAccuracy()) * (self._maxSector * random() - self._maxSector / 2);
        bullet._bullets = self._bullets;
        self._bullets.push(bullet);

        self._harmWeapon();
    };

    self.startShooting = function() {
        if (self._isShootingAllowed()) {
            self.shoot();       // single shot

            self._forbidShoot();
            setTimeout(function() {
                self._allowShoot();
            }, self._shootingDelay);
        }
    };

    self.stopShooting = function() {};

    self.fix = function() {
        self._state = self._hardness;
    };

    self.setHardness = function(hardness) {
        self._state = self._hardness = hardness;
    };

    self.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
        self.angle = MathUtility.getLinesAngle(
            unitX - self._weaponOffsetY * sin_d(unitAngle) + self._weaponOffsetX * cos_d(unitAngle),
            unitY + self._weaponOffsetY * cos_d(unitAngle) + self._weaponOffsetX * sin_d(unitAngle),
            targetX,
            targetY
        );

        self.x = unitX - self._weaponOffsetY * sin_d(unitAngle) + self._weaponOffsetX * cos_d(unitAngle);
        self.y = unitY + self._weaponOffsetY * cos_d(unitAngle) + self._weaponOffsetX * sin_d(unitAngle);
    };

    // @Override
    self.p_destroyShapes = self.destroyShapes;    // save parents function
    self.destroyShapes = function() {             // destroy own shapes and start destroying of children
        self.p_destroyShapes();
        self.stopShooting();
    };

    self._allowShoot = function() {
        self._canShoot = true;
    };

    self._forbidShoot = function() {
        self._canShoot = false;
    };

    self._isShootingAllowed = function() {
        return self._canShoot;
    };

    self._getAccuracy = function() {
        return self._state / self._hardness;
    };

    self._harmWeapon = function() {
        if (self._state > 0) {
            self._state--;
        }
    };

    return self;
}

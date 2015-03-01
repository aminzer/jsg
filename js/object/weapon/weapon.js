function Weapon(opts) {
    var self = ShapedObject(opts);

    var _globalBullets = opts.bullets;

    var _frontLength = WEAPON_FRONT_LENGTH;      // influence on bullets start coordinates
    var _weaponOffsetY = opts.weaponOffsetY || UNIT_RADIUS - 5;   // offset between weapon's and unit's centers
    var _weaponOffsetX = opts.weaponOffsetX || 0;

    var _hardness = WEAPON_HARDNESS;             // max number of bullets to reduce the accuracy
    var _state = _hardness;                      // current number of bullets to reduce the accuracy
    var _maxSector = WEAPON_MAX_SECTOR;          // if accuracy = 0, bullets will be in this sector (degrees)

    var _bulletConstructor = Bullet;

    var _shootingDelay = WEAPON_SHOOTING_DELAY;  // min time interval between 2 shots
    var _canShoot = true;

    self.shoot = function() {
        _globalBullets.push(_bulletConstructor({
            stage: self.getStage(),
            bullets: _globalBullets,
            x: self.getX() + _frontLength * cos_d(self.getAngle()),
            y: self.getY() + _frontLength * sin_d(self.getAngle()),
            angle: self.getAngle() + (1 - self.getAccuracy()) * (_maxSector * random() - _maxSector / 2)
        }));

        self.harmWeapon();
    };

    self.startShooting = function() {
        if (self.isShootingAllowed()) {
            self.shoot();       // single shot

            self.forbidShoot();
            setTimeout(function() {
                self.allowShoot();
            }, _shootingDelay);
        }
    };

    self.stopShooting = function() {};

    self.allowShoot = function() {
        _canShoot = true;
    };

    self.forbidShoot = function() {
        _canShoot = false;
    };

    self.isShootingAllowed = function() {
        return _canShoot;
    };

    self.fix = function() {
        _state = _hardness;
    };

    self.harmWeapon = function() {
        if (_state > 0) {
            _state--;
        }
    };

    self.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
        self.setAngle(MathUtility.getLinesAngle(
            unitX - _weaponOffsetY*sin_d(unitAngle) + _weaponOffsetX*cos_d(unitAngle),
            unitY + _weaponOffsetY*cos_d(unitAngle) + _weaponOffsetX*sin_d(unitAngle),
            targetX,
            targetY
        ));

        self.setX(unitX - _weaponOffsetY * sin_d(unitAngle) + _weaponOffsetX*cos_d(unitAngle));
        self.setY(unitY + _weaponOffsetY * cos_d(unitAngle) + _weaponOffsetX*sin_d(unitAngle));
    };

    // @Override
    self.p_destroyShapes = self.destroyShapes;    // save parents function
    self.destroyShapes = function() {             // destroy own shapes and start destroying of children
        self.p_destroyShapes();
        self.stopShooting();
    };

    self.getAccuracy = function() {
        return _state / _hardness;
    };

    // setters/getters
    self.getFrontLength = function() {
        return _frontLength;
    };

    self.setFrontLength = function(length) {
        _frontLength = length;
    };

    self.setMaxSector = function(sector) {
        _maxSector = sector;
    };

    self.getGlobalBullets = function() {
        return _globalBullets;
    };

    self.getMaxSector = function() {
        return _maxSector;
    };

    self.setHardness = function(hardness) {
        _hardness = _state = hardness;
    };

    self.setBulletConstructor = function(bulletConstructor) {
        _bulletConstructor = bulletConstructor;
    };

    self.setShootingDelay = function(shootingDelay) {
        _shootingDelay = shootingDelay;
    };

    self.getShootingDelay = function() {
        return _shootingDelay;
    };

    self.setWeaponOffsetY = function(offset) {
        _weaponOffsetY = offset;
    };

    self.getWeaponOffsetY = function() {
        return _weaponOffsetY;
    };

    self.setWeaponOffsetX = function(offset) {
        _weaponOffsetX = offset;
    };

    self.getWeaponOffsetX = function() {
        return _weaponOffsetX;
    };

    return self;
}

function Weapon(opts, init) {
    var self = ShapedObject(opts);

    var _globalBullets = opts.bullets;

    var _frontLength = WEAPON_FRONT_LENGTH;      // influence on bullets start coordinates

    var _hardness = WEAPON_HARDNESS;             // max number of bullets to reduce the accuracy
    var _state = _hardness;                      // current number of bullets to reduce the accuracy
    var _maxSector = WEAPON_MAX_SECTOR;          // if accuracy = 0, bullets will be in this sector (degrees)

    var _bulletConstructor = Bullet;

    var _shootingDelay = WEAPON_SHOOTING_DELAY;  // min time interval between 2 shots
    var _canShoot = true;

    self.init = function() {
        var body = new createjs.Shape();
        body.graphics.beginFill('#444').drawRect(0, 0, _frontLength + 15, 5);
        body.regX = 15;
        body.regY = 2.5;
        self.addShape(body);
    };

    if (init !== false) {
        self.init();
    }

    self.shoot = function() {
        _globalBullets.push(_bulletConstructor({
            stage: self.getStage(),
            bullets: _globalBullets,
            x: self.getX() + _frontLength * cos_d(self.getAngle()),
            y: self.getY() + _frontLength * sin_d(self.getAngle()),
            angle: self.getAngle() + (1 - self.getAccuracy()) * (_maxSector * random() - _maxSector / 2)
        }));

      //  self.harmWeapon();
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

    return self;
}

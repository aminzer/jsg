function Unit(opts, init) {
    var self = ShapedObject(opts);

    var _dynamicObjects = opts.dynamicObjects;
    var _bullets = opts.bullets;

    // TODO add max hp
    var _hp = opts.hp || UNIT_HP;
    var _maxHp = opts.hp || UNIT_HP;
    var _radius = opts.radius || UNIT_RADIUS;          // body area = circle (for handling hits)

    var _movingAngle = NO_MOVEMENT;     // angle in which unit move (degrees)
    var _speed = opts.speed || UNIT_SPEED;

    var _weapon;
    var _weaponConstructor = opts.weapon || AutomaticWeapon;
    var _weaponOffsetY = UNIT_WEAPON_OFFSET_Y;     // offset between weapon's and unit's centers

    self.startMoving = function(newAngle) {
        _movingAngle = newAngle;
    };

    self.stopMoving = function() {
        _movingAngle = NO_MOVEMENT;
    };

    self.move = function() {
        if (_movingAngle !== NO_MOVEMENT) {
            self.moveX(_speed * cos_d(_movingAngle));
            self.moveY(_speed * sin_d(_movingAngle));
        }
        return true;
    };

    self.aimAt = function(targetX, targetY) {
        self.setAngle(MathUtility.getLinesAngle(self.getX(), self.getY(), targetX, targetY));

        _weapon.setAngle(MathUtility.getLinesAngle(
            self.getX() - _weaponOffsetY*sin_d(self.getAngle()),
            self.getY() + _weaponOffsetY*cos_d(self.getAngle()),
            targetX,
            targetY
        ));

        _weapon.setX(self.getX() - _weaponOffsetY * sin_d(self.getAngle()));
        _weapon.setY(self.getY() + _weaponOffsetY * cos_d(self.getAngle()));
    };

    self.shoot = function() {
        _weapon.shoot();
    };

    self.startShooting = function() {
        _weapon.startShooting();
    };

    self.stopShooting = function() {
        _weapon.stopShooting();
    };

    self.takeDamage = function(damage) {
        _hp -= damage;
        console.log("damage = " + damage);
    };

    self.isAlive = function() {
        return _hp > 0;
    };

    // @Override
    self.p_updateShapes = self.updateShapes;    // save parents function
    self.updateShapes = function() {            // update own shapes and start updating of children
        self.p_updateShapes();
        _weapon.updateShapes();
    };

    // @Override
    self.p_destroyShapes = self.destroyShapes;    // save parents function
    self.destroyShapes = function() {            // destroy own shapes and start destroying of children
        self.p_destroyShapes();
        _weapon.destroyShapes();
    };

    self.getObjectType = function() {
        return OBJECT_TYPE_UNIT | OBJECT_TYPE_ENEMY;
    };

    self.setWeapon = function(weapon) {
        _weapon = weapon;
    };

    self.getWeapon = function() {
        return _weapon;
    };

    self.setWeaponConstructor = function(weaponConstructor) {
        _weaponConstructor = weaponConstructor;
    };

    self.getWeaponConstructor = function() {
        return _weaponConstructor;
    };

    self.setDynamicObjects = function(dynamicObjects) {
        _dynamicObjects = dynamicObjects;
    };

    self.getDynamicObjects = function() {
        return _dynamicObjects;
    };

    self.getBullets = function() {
        return _bullets;
    };

    self.setWeaponOffsetY = function(offset) {
        _weaponOffsetY = offset;
    };

    self.getWeaponOffsetY = function() {
        return _weaponOffsetY;
    };

    self.setRadius = function(radius) {
        _radius = radius;
    };

    self.getRadius = function() {
        return _radius;
    };

    self.setMaxHp = function(maxHp) {
        _hp = _maxHp = maxHp;
    };

    self.getHp = function() {
        return _hp;
    };

    return self;
}

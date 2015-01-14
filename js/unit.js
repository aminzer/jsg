function Unit(opts, init) {
    var self = ShapedObject(opts);

    var _dynamicObjects = opts.dynamicObjects;
    var _bullets = opts.bullets;

    var _hp = opts.hp || UNIT_HP;
    var _radius = opts.radius || UNIT_RADIUS;          // body area = circle (for handling hits)

    var _movingAngle = NO_MOVEMENT;     // angle in which unit move (degrees)
    var _speed = opts.speed || UNIT_SPEED;

    var _weapon;
    var _weaponOffsetY = UNIT_WEAPON_OFFSET_Y;     // offset between weapon's and unit's centers

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#199EE0").drawCircle(0,0,20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#559').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);

        _weapon = AutomaticWeapon({
            stage: self.getStage(),
            bullets: _bullets,
            x: opts.x,
            y: opts.y + _weaponOffsetY
        });
    };

    if (init !== false) {
        self.init();
    }

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

    self.setWeapon = function(weapon) {
        _weapon = weapon;
    };

    self.getWeapon = function() {
        return _weapon;
    };

    self.getObjectType = function() {
        return "unit";
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

    return self;
}

function Unit(opts) {
    var self = ShapedObject(opts);

    self._maxHp = opts.maxHp || UNIT.DEFAULT.HP;
    self._hp = self._maxHp;

    self._radius = opts.radius || UNIT.DEFAULT.RADIUS;          // body area = circle (for handling hits)

    self._movingAngle = NO_MOVEMENT;             // angle in which unit move (deg)
    self._speed = opts.speed || UNIT.DEFAULT.SPEED;

    self._weapon = null;

    self._unitType = opts.unitType || (UNIT_TYPE.ENEMY);

    self._bullets = opts.bullets;

    self.startMoving = function(newAngle) {
        self._movingAngle = newAngle;
    };

    self.stopMoving = function() {
        self._movingAngle = NO_MOVEMENT;
    };

    self.move = function() {
        if (self._movingAngle !== NO_MOVEMENT) {
            self.moveX(self._speed * cos_d(self._movingAngle));
            self.moveY(self._speed * sin_d(self._movingAngle));
        }
        return true;
    };

    self.aimAt = function(targetX, targetY) {
        self.angle = MathUtility.getLinesAngle(self.x, self.y, targetX, targetY);
        self._weapon.aimAt(targetX, targetY, self.x, self.y, self.angle);
    };

    self.shoot = function() {
        self._weapon.shoot();
    };

    self.startShooting = function() {
        self._weapon.startShooting();
    };

    self.stopShooting = function() {
        self._weapon.stopShooting();
    };

    self.takeDamage = function(damage) {
        self._hp -= damage;
    };

    self.isAlive = function() {
        return self._hp > 0;
    };

    self.isPointInside = function(pointX, pointY) {
        return MathUtility.isInCircle(pointX, pointY, self.x, self.y, self._radius);
    };

    // @Override
    self.p_updateShapes = self.updateShapes;    // save parents function
    self.updateShapes = function() {            // update own shapes and start updating of children
        self.p_updateShapes();
        self._weapon.updateShapes();
    };

    // @Override
    self.p_destroyShapes = self.destroyShapes;    // save parents function
    self.destroyShapes = function() {            // destroy own shapes and start destroying of children
        self.p_destroyShapes();
        self._weapon.destroyShapes();
    };

    self.getObjectType = function() {
        return self._unitType;
    };

    self.setMaxHp = function(maxHp) {
        self._maxHp = self._hp = maxHp;
    };

    return self;
}

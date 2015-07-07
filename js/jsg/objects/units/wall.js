function Wall(opts, draw) {
    var self = Unit(opts);

    self._movingAngle = NO_MOVEMENT;
    self._weapon = FakeWeapon({
        stage: self._stage,
        bullets: self._bullets
    }, false);

    self._unitType = opts.unitType || (UNIT_TYPE.NEUTRAL);

    self.setMaxHp(UNIT.WALL.HP);

    self.isPointInside = function(pointX, pointY) {
        // TODO: maybe should define height and width and use it here and in draw()
        return ((pointX >= self.x - 25) && (pointX <= self.x + 25)) && ((pointY >= self.y - 25) && (pointY <= self.y + 25));
    };

    self.draw = function() {
        Painter.rectangle(self, 50, 50, 25, 25, "#474924");
    };

    if (draw !== false) {
        self.draw();
    }

    self.shoot = function() {};

    self.startShooting = function() {};

    self.stopShooting = function() {};

    self.aimAt = function(targetX, targetY) {};

    self.startMoving = function(angle) {};

    self.stopMoving = function() {};

    return self;
}

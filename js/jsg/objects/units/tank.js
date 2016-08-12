define(function (require, exports, module) {
    var meta        = require('meta'),
        MathUtility = require('math-util'),
        UNIT        = require('const/physics/unit'),
        SquareUnit  = require('objects/units/square-unit'),
        Unit        = require('objects/units/unit'),
        TankGun     = require('objects/weapons/tank-gun'),
        WeaponSet   = require('objects/weapons/weapon-set'),
        Painter     = require('util/painter');

    function Tank(opts, render) {
        opts = new meta.Hash( opts ).merge({
            length: 80,
            width: 20,
            weaponSet: WeaponSet.oneGun(new TankGun({}, false))
        }).to_obj();
        
        SquareUnit.call(this, opts);
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( Tank )
    
        .extend_from( SquareUnit )
    
        .define_method({
            render: function () {
                Painter.rect(this, this.length, this.width, "#474924");
                Painter.circle(this, 3, "red");
    
                if (this.weapon != null) {
                    this.weapon.render();
                }
            }
        })
    ;
    
    
    // TODO refactor and move to master
    //function Tank1(opts, draw) {
    //    var self = Unit(opts);
    //
    //    self._width = 150;
    //    self._height = 124;
    //
    //    var _turnTimer = null;
    //    var _neededDirection;
    //    var _turnError = 10;
    //
    //    var _tracksTimer = null;
    //    var _tracksShapes = [];
    //    var _tracksOffset = 10;
    //
    //    self.setMaxHp(UNIT.TANK.HP);
    //
    //    self.isPointInside = function (pointX, pointY) {
    //        var relativeX = (pointX - self.x) * cos_d(self.angle) + (pointY - self.y) * sin_d(self.angle);
    //        var relativeY = -(pointX - self.x) * sin_d(self.angle) + (pointY - self.y) * cos_d(self.angle);
    //        return (Math.abs(relativeX) <= self._width / 2) && (Math.abs(relativeY) <= self._height / 2);
    //    };
    //
    //    self._weapon = TankGun({
    //        stage: self._stage,
    //        bullets: self._bullets
    //    }, false);
    //
    //    self.draw = function () {
    //        Painter.roundRectangle(self, self._width, self._height - 44, self._width / 2, self._height / 2 - 22, 5, "#474924");
    //
    //        Painter.offsetRoundRectangle(self, 0, self._height / 2 - 10, self._width - 10, 20, self._width / 2 - 5, 10, 5, "#444");
    //        Painter.offsetRoundRectangle(self, 0, -(self._height / 2 - 10), self._width - 10, 20, self._width / 2 - 5, 10, 5, "#444");
    //
    //        _drawTracks();
    //
    //        Painter.offsetRoundRectangle(self, 30 - self._width / 2, 20, 40, 20, 25, 10, 3, "#402511");
    //        Painter.offsetRoundRectangle(self, 30 - self._width / 2, -20, 40, 20, 25, 10, 3, "#402511");
    //
    //        Painter.offsetRectangle(self, self._width / 2 + 5, -self._height / 2 + 62, 6, self._height - 54, 3, 35, "#8B4D40");
    //        Painter.offsetRectangle(self, self._width / 2 + 10, 20, 10, 4, 5, 2, "#8B4D40");
    //        Painter.offsetRectangle(self, self._width / 2 + 10, 10, 10, 4, 5, 2, "#8B4D40");
    //        Painter.offsetRectangle(self, self._width / 2 + 10, -10, 10, 4, 5, 2, "#8B4D40");
    //        Painter.offsetRectangle(self, self._width / 2 + 10, -20, 10, 4, 5, 2, "#8B4D40");
    //
    //        self._weapon.draw();
    //    };
    //
    //    if (draw !== false) {
    //        self.draw();
    //    }
    //
    //    self.aimAt = function (targetX, targetY) {
    //        if (self._movingAngle !== NO_MOVEMENT) {
    //            self.angle = self._movingAngle;
    //        }
    //        self._weapon.aimAt(targetX, targetY, self.x, self.y, self.angle);
    //    };
    //
    //    self.startMoving = function (angle) {
    //        if (_tracksTimer == null) {
    //            _tracksTimer = setInterval(_moveTracks, 200);
    //        }
    //
    //        _neededDirection = angle;
    //
    //        if (MathUtility.absoluteAngleDifference(self.angle, _neededDirection) < _turnError) {  // if tank already directed right
    //            if (self._movingAngle == NO_MOVEMENT) {
    //                self._movingAngle = self.angle;
    //            }
    //            return;
    //        }
    //
    //        if (_turnTimer == null) {
    //            self._movingAngle = self.angle;
    //            _turnTimer = setInterval(function () {
    //                var sign = MathUtility.isClockwiseDirection(self.angle, _neededDirection) ? 1 : -1;
    //                self._movingAngle += self._speed / 1.5 * sign;
    //
    //                if (MathUtility.absoluteAngleDifference(self.angle, _neededDirection) < _turnError) {   // if tank finished turning
    //                    clearInterval(_turnTimer);
    //                    _turnTimer = null;
    //                }
    //            }, 20);
    //        }
    //    };
    //
    //    self.stopMoving = function () {
    //        self._movingAngle = NO_MOVEMENT;
    //        clearInterval(_turnTimer);
    //        _turnTimer = null;
    //        clearInterval(_tracksTimer);
    //        _tracksTimer = null;
    //    };
    //
    //  //  self.startShooting = function () {};
    //
    //
    //
    //    function _moveTracks() {
    //        for (var i = 0; i < _tracksShapes.length; i++) {
    //            _tracksShapes[i].regX += _tracksOffset;
    //        }
    //        _tracksOffset *= -1;
    //    }
    //
    //    return self;
    //}

    module.exports = Tank;
});

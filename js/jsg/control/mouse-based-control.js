define(function (require, exports, module) {
    var meta        = require('meta'),
        MathUtility = require('math-util'),
        Control     = require('control/control');

    function MouseBasedControl(opts) {
        opts = opts || {};
    
        Control.call(this, opts);
    }
    
    new meta.Class( MouseBasedControl )
    
        .extend_from( Control )
    
        .define_methods({
            handleKeyDown: function (keyCode) {
                this.markKeyAsPressed(keyCode);
                this._correctPlayerDirection();
    
                if (this.isPressed('HUCK.FIX_WEAPON')) {
                    this.controlledUnit.hasWeapon() && this.controlledUnit.weapon.fix();
                }
            },
    
            handleKeyUp: function (keyCode) {
                this.markKeyAsReleased(keyCode);
                this._correctPlayerDirection();
            },
    
            handleMouseDown: function (targetX, targetY) {
                this.controlledUnit.startShooting();
            },
    
            handleMouseUp: function (targetX, targetY) {
                this.controlledUnit.stopShooting();
            },
    
            handleMouseMove: function (targetX, targetY) {
                this.cursor.position = {
                    x: targetX,
                    y: targetY
                };
            },
    
            handleMouseWheel: function (delta) {
                if (delta > 0) {
                    this.controlledUnit.chooseNextWeapon();
                } else {
                    this.controlledUnit.choosePrevWeapon();
                }
            },
    
            handleRender: function () {
                this.cursor.updateShapes();
                this.controlledUnit.aimAt(this.cursor.x, this.cursor.y);
            },
    
            _correctPlayerDirection: function () {
                var dx = this.isPressed('MOVE.RIGHT') - this.isPressed('MOVE.LEFT'),
                    dy = this.isPressed('MOVE.DOWN') - this.isPressed('MOVE.UP');
    
                if (dx || dy) {
                    this.controlledUnit.startMoving( MathUtility.getLinesAngle(0, 0, dx, dy) );
                } else {
                    this.controlledUnit.stopMoving();
                }
            }
        })
    ;

    module.exports = MouseBasedControl;
});

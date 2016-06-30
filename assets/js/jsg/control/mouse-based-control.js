function MouseBasedControl(opts) {
    opts = opts || {};

    Control.call(this, opts);

    this._pressedKeys = {};
}

new meta.Class( MouseBasedControl )

    .extend_from( Control )

    .define_methods({
        handleKeyDown: function (keyCode) {
            this._pressedKeys[keyCode] = true;
            this._correctPlayerDirection();

            if (this.isPressed('HUCK.FIX_WEAPON')) {
                this._controlledObject.weapon.fix();
            }
        },

        handleKeyUp: function (keyCode) {
            this._pressedKeys[keyCode] = false;
            this._correctPlayerDirection();
        },

        handleMouseDown: function (targetX, targetY) {
            this._controlledObject.startShooting();
        },

        handleMouseUp: function (targetX, targetY) {
            this._controlledObject.stopShooting();
        },

        handleMouseMove: function (targetX, targetY) {
            this.cursor.position = {
                x: targetX,
                y: targetY
            };
        },

        handleMouseWheel: function (delta) {
            if (delta > 0) {
                this._controlledObject.chooseNextWeapon();
            } else {
                this._controlledObject.choosePrevWeapon();
            }
        },

        handleRender: function () {
            this.cursor.updateShapes();
            this._controlledObject.aimAt(this.cursor.x, this.cursor.y);
        },

        _correctPlayerDirection: function () {
            var dx = this.isPressed('MOVE.RIGHT') - this.isPressed('MOVE.LEFT'),
                dy = this.isPressed('MOVE.DOWN') - this.isPressed('MOVE.UP');

            if (dx || dy) {
                this._controlledObject.startMoving( MathUtility.getLinesAngle(0, 0, dx, dy) );
            } else {
                this._controlledObject.stopMoving();
            }
        }
    })
;

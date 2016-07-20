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
                this.controlledObject.weapon.fix();
            }
        },

        handleKeyUp: function (keyCode) {
            this.markKeyAsReleased(keyCode);
            this._correctPlayerDirection();
        },

        handleMouseDown: function (targetX, targetY) {
            this.controlledObject.startShooting();
        },

        handleMouseUp: function (targetX, targetY) {
            this.controlledObject.stopShooting();
        },

        handleMouseMove: function (targetX, targetY) {
            this.cursor.position = {
                x: targetX,
                y: targetY
            };
        },

        handleMouseWheel: function (delta) {
            if (delta > 0) {
                this.controlledObject.chooseNextWeapon();
            } else {
                this.controlledObject.choosePrevWeapon();
            }
        },

        handleRender: function () {
            this.cursor.updateShapes();
            this.controlledObject.aimAt(this.cursor.x, this.cursor.y);
        },

        _correctPlayerDirection: function () {
            var dx = this.isPressed('MOVE.RIGHT') - this.isPressed('MOVE.LEFT'),
                dy = this.isPressed('MOVE.DOWN') - this.isPressed('MOVE.UP');

            if (dx || dy) {
                this.controlledObject.startMoving( MathUtility.getLinesAngle(0, 0, dx, dy) );
            } else {
                this.controlledObject.stopMoving();
            }
        }
    })
;
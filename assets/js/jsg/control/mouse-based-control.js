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
            var dx = 0,
                dy = 0;

            if (this.isPressed('MOVE.RIGHT')) {
                dx++;
            }
            if (this.isPressed('MOVE.LEFT')) {
                dx--;
            }
            if (this.isPressed('MOVE.DOWN')) {
                dy++;
            }
            if (this.isPressed('MOVE.UP')) {
                dy--;
            }
            if (dx == 0 && dy == 0) {
                this._controlledObject.stopMoving();
                return;
            }

            var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
            if (dy < 0) {
                angle = -angle;
            }
            this._controlledObject.startMoving(angle);
        }
    })
;

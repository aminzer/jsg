function UniversalControl(opts) {
    opts = opts || {};

    MouseBasedControl.call(this, opts);

    if (!this._isMouseOn()) {
        this.cursor.speed = this.getProperty('CURSOR.SENSITIVITY', 10);
    }
}

new meta.Class( UniversalControl )

    .extend_from( MouseBasedControl )

    .override_methods({
        handleKeyDown: function (keyCode) {
            this.parent_handleKeyDown(keyCode);
            this._correctCursorPosition();
            this._handleWeaponChanges();
        },

        handleKeyUp: function (keyCode) {
            this.parent_handleKeyUp(keyCode);
            this._correctCursorPosition();
            this._handleWeaponChanges();
        },

        handleMouseDown: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parent_handleMouseDown(targetX, targetY);
            }
        },

        handleMouseUp: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parent_handleMouseUp(targetX, targetY);
            }
        },

        handleMouseMove: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parent_handleMouseMove(targetX, targetY);
            }
        },

        handleMouseWheel: function (delta) {
            if (this._isMouseOn()) {
                this.parent_handleMouseWheel(delta);
            }
        },

        handleRender: function () {
            this.cursor.move();
            this.parent_handleRender();
        }
    })

    .define_methods({
        _correctCursorPosition: function () {
            if (this._isMouseOn()) return;

            var dx = this.isPressed('CURSOR.RIGHT') - this.isPressed('CURSOR.LEFT'),
                dy = this.isPressed('CURSOR.DOWN') - this.isPressed('CURSOR.UP');

            if (dx || dy) {
                this.cursor.startMoving( MathUtility.getLinesAngle(0, 0, dx, dy) );
            } else {
                this.cursor.stopMoving();
            }
        },

        _handleWeaponChanges: function () {
            if (!this._isMouseOn()) {
                if (this.isPressed('WEAPON.SHOOT')) {
                    this._controlledObject.startShooting();
                } else {
                    this._controlledObject.stopShooting();
                }
            }

            if (this.isPressed('WEAPON.NEXT_WEAPON')) {
                this._controlledObject.chooseNextWeapon();
            }

            if (this.isPressed('WEAPON.PREV_WEAPON')) {
                this._controlledObject.choosePrevWeapon();
            }
        },

        _isMouseOn: function () {
            return this.getProperty('CURSOR.MOUSE') === true;
        }
    })
;

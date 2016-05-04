function UniversalControl(opts) {
    opts = opts || {};

    MouseBasedControl.call(this, opts);

    if (!this._isMouseOn()) {
        this.getCursor().setSpeed(this.getProperty('CURSOR.SENSITIVITY', 10));
    }
}

meta.Class( UniversalControl )

    .extend_from( MouseBasedControl )

    .override_methods({
        handleKeyDown: function (keyCode) {
            this.parentMethod_handleKeyDown(keyCode);
            this._correctCursorPosition();
            this._handleWeaponChanges();
        },

        handleKeyUp: function (keyCode) {
            this.parentMethod_handleKeyUp(keyCode);
            this._correctCursorPosition();
            this._handleWeaponChanges();
        },

        handleMouseDown: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parentMethod_handleMouseDown(targetX, targetY);
            }
        },

        handleMouseUp: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parentMethod_handleMouseUp(targetX, targetY);
            }
        },

        handleMouseMove: function (targetX, targetY) {
            if (this._isMouseOn()) {
                this.parentMethod_handleMouseMove(targetX, targetY);
            }
        },

        handleMouseWheel: function (delta) {
            if (this._isMouseOn()) {
                this.parentMethod_handleMouseWheel(delta);
            }
        },

        handleRender: function () {
            this.getCursor().move();
            this.parentMethod_handleRender();
        }
    })

    .define_methods({
        _correctCursorPosition: function () {
            if (this._isMouseOn()) {
                return;
            }
            var dx = 0,
                dy = 0;

            if (this.isPressed('CURSOR.RIGHT')) {
                dx++;
            }
            if (this.isPressed('CURSOR.LEFT')) {
                dx--;
            }
            if (this.isPressed('CURSOR.DOWN')) {
                dy++;
            }
            if (this.isPressed('CURSOR.UP')) {
                dy--;
            }
            if (dx == 0 && dy == 0) {
                this.getCursor().stopMoving();
                return;
            }

            var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
            if (dy < 0) {
                angle = -angle;
            }
            this.getCursor().startMoving(angle);
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

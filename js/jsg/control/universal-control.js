function UniversalControl(opts) {
    opts = opts || {};

    MouseBasedControl.call(this, opts);

    if (!this._isMouseOn()) {
        this.getCursor().setSpeed(this.getProperty('CURSOR.SENSITIVITY', 10));
    }
}

Extend(UniversalControl).from(MouseBasedControl);

UniversalControl.prototype.handleKeyDown = function(keyCode) {
    MouseBasedControl.prototype.handleKeyDown.call(this, keyCode);
    this._correctCursorPosition();
    this._handleWeaponChanges();
};

UniversalControl.prototype.handleKeyUp = function(keyCode) {
    MouseBasedControl.prototype.handleKeyUp.call(this, keyCode);
    this._correctCursorPosition();
    this._handleWeaponChanges();
};

UniversalControl.prototype.handleMouseDown = function(targetX, targetY) {
    if (this._isMouseOn()) {
        MouseBasedControl.prototype.handleMouseDown.call(this, targetX, targetY);
    }
};

UniversalControl.prototype.handleMouseUp = function(targetX, targetY) {
    if (this._isMouseOn()) {
        MouseBasedControl.prototype.handleMouseUp.call(this, targetX, targetY);
    }
};

UniversalControl.prototype.handleMouseMove = function(targetX, targetY) {
    if (this._isMouseOn()) {
        MouseBasedControl.prototype.handleMouseMove.call(this, targetX, targetY);
    }
};

UniversalControl.prototype.handleMouseWheel = function(delta) {
    if (this._isMouseOn()) {
        MouseBasedControl.prototype.handleMouseWheel.call(this, delta);
    }
};

UniversalControl.prototype.handleRender = function() {
    this.getCursor().move();
    MouseBasedControl.prototype.handleRender.call(this);
};

UniversalControl.prototype._correctCursorPosition = function() {
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
};

UniversalControl.prototype._handleWeaponChanges = function() {
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
};

UniversalControl.prototype._isMouseOn = function() {
    return this.getProperty('CURSOR.MOUSE') === true;
};

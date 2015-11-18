function KeyboardControl(opts) {
    opts = opts || {};

    DefaultControl.call(this, opts);

    this.getCursor().setSpeed(this.getProperty('CURSOR.SENSITIVITY', 10));
}

Extend(KeyboardControl).from(DefaultControl);

KeyboardControl.prototype.handleKeyDown = function(keyCode) {
    DefaultControl.prototype.handleKeyDown.call(this, keyCode);
    this._correctCursorPosition();
    this._handleWeaponChanges();
};

KeyboardControl.prototype.handleKeyUp = function(keyCode) {
    DefaultControl.prototype.handleKeyUp.call(this, keyCode);
    this._correctCursorPosition();
    this._handleWeaponChanges();
};

KeyboardControl.prototype.handleMouseDown = function(targetX, targetY) { /* do nothing */ };

KeyboardControl.prototype.handleMouseUp = function(targetX, targetY) { /* do nothing */ };

KeyboardControl.prototype.handleMouseMove = function(targetX, targetY) { /* do nothing */ };

KeyboardControl.prototype.handleMouseWheel = function(delta) { /* do nothing */ };

KeyboardControl.prototype.handleRender = function() {
    this.getCursor().move();
    DefaultControl.prototype.handleRender.call(this);
};

KeyboardControl.prototype._correctCursorPosition = function() {
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

KeyboardControl.prototype._handleWeaponChanges = function() {
    if (this.isPressed('WEAPON.SHOOT')) {
        this._controlledObject.startShooting();
    } else {
        this._controlledObject.stopShooting();
    }

    if (this.isPressed('WEAPON.NEXT_WEAPON')) {
        this._controlledObject.chooseNextWeapon();
    }

    if (this.isPressed('WEAPON.PREV_WEAPON')) {
        this._controlledObject.choosePrevWeapon();
    }
};

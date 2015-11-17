function DefaultControl(opts) {
    opts = opts || {};

    Control.call(this, opts);

    this._pressedKeys = {};
}

Extend(DefaultControl).from(Control);

DefaultControl.prototype.player = function() {
    return _.player();
};

DefaultControl.prototype.handleKeyDown = function(keyCode) {
    this._pressedKeys[keyCode] = true;
    this._correctPlayerDirection();

    if (keyCode == this.getKeyMap().HUCK.FIX_WEAPON) {
        this.player().getWeapon().fix();
    }
};

DefaultControl.prototype.handleKeyUp = function(keyCode) {
    this._pressedKeys[keyCode] = false;
    this._correctPlayerDirection();
};

DefaultControl.prototype.handleMouseDown = function(targetX, targetY) {
    this.player().startShooting();
};

DefaultControl.prototype.handleMouseUp = function(targetX, targetY) {
    this.player().stopShooting();
};

DefaultControl.prototype.handleMouseMove = function(targetX, targetY) {
    this.getCursor().setXY(targetX, targetY);
};

DefaultControl.prototype.handleMouseWheel = function(delta) {
    if (delta > 0) {
        _.player().chooseNextWeapon();
    } else {
        _.player().choosePrevWeapon();
    }
};

DefaultControl.prototype.handleRender = function() {
    this.player().aimAt(this.getCursor().getX(), this.getCursor().getY());
};

DefaultControl.prototype._correctPlayerDirection = function setPlayersDirection() {
    var dx = 0,
        dy = 0;

    if (this._pressedKeys[this.getKeyMap().MOVE.RIGHT]) {
        dx++;
    }
    if (this._pressedKeys[this.getKeyMap().MOVE.LEFT]) {
        dx--;
    }
    if (this._pressedKeys[this.getKeyMap().MOVE.DOWN]) {
        dy++;
    }
    if (this._pressedKeys[this.getKeyMap().MOVE.UP]) {
        dy--;
    }
    if (dx == 0 && dy == 0) {
        this.player().stopMoving();
        return;
    }

    var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
    if (dy < 0) {
        angle = -angle;
    }

    this.player().startMoving(angle);
};

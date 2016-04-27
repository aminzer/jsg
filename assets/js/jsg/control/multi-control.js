function MultiController(opts) {
    this._controls = opts.controls;
}

MultiController.prototype.handleKeyDown = function(keyCode) {
    this._controls.forEach(function(control) {
        control.handleKeyDown(keyCode);
    });
};

MultiController.prototype.handleKeyUp = function(keyCode) {
    this._controls.forEach(function(control) {
        control.handleKeyUp(keyCode);
    });
};

MultiController.prototype.handleMouseUp = function(targetX, targetY) {
    this._controls.forEach(function(control) {
        control.handleMouseUp(targetX, targetY);
    });
};

MultiController.prototype.handleMouseDown = function(targetX, targetY) {
    this._controls.forEach(function(control) {
        control.handleMouseDown(targetX, targetY);
    });
};

MultiController.prototype.handleMouseMove = function(targetX, targetY) {
    this._controls.forEach(function(control) {
        control.handleMouseMove(targetX, targetY);
    });
};

MultiController.prototype.handleMouseWheel = function(delta) {
    this._controls.forEach(function(control) {
        control.handleMouseWheel(delta);
    });
};

MultiController.prototype.handleRender = function() {
    this._controls.forEach(function(control) {
        control.handleRender();
    });
};

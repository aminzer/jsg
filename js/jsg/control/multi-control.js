define(function (require, exports, module) {
    var meta = require('meta');

    function MultiControl(opts) {
        this._controls = opts.controls;
    }
    
    new meta.Class( MultiControl )
    
        .define_methods({
            handleKeyDown: function (keyCode) {
                this._controls.forEach(function (control) {
                    control.handleKeyDown(keyCode);
                });
            },
    
            handleKeyUp: function (keyCode) {
                this._controls.forEach(function (control) {
                    control.handleKeyUp(keyCode);
                });
            },
    
            handleMouseDown: function (targetX, targetY) {
                this._controls.forEach(function (control) {
                    control.handleMouseDown(targetX, targetY);
                });
            },
    
            handleMouseUp: function (targetX, targetY) {
                this._controls.forEach(function (control) {
                    control.handleMouseUp(targetX, targetY);
                });
            },
    
            handleMouseMove: function (targetX, targetY) {
                this._controls.forEach(function (control) {
                    control.handleMouseMove(targetX, targetY);
                });
            },
    
            handleMouseWheel: function (delta) {
                this._controls.forEach(function (control) {
                    control.handleMouseWheel(delta);
                });
            },
    
            handleRender: function () {
                this._controls.forEach(function (control) {
                    control.handleRender();
                });
            }
        })
    ;

    module.exports = MultiControl;
});

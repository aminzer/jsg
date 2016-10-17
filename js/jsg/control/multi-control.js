define(function (require, exports, module) {
    var meta = require('meta');

    function MultiControl(opts) {
        this._controls = opts.controls;
    }

    var MultiControl_MetaClass = new meta.Class( MultiControl );

    [
        'handleKeyDown',
        'handleKeyUp',
        'handleMouseDown',
        'handleMouseUp',
        'handleMouseMove',
        'handleMouseWheel',
        'handleRender'
    ].forEach(function (method) {
        this.define_method(method, function (/*...args*/) {
            var args = arguments;
            this._controls.forEach(function (control) {
                control[method].apply(control, args);
            });
        });
    }, MultiControl_MetaClass);

    module.exports = MultiControl;
});

define(function (require, exports, module) {
    var meta = require('meta');

    function ControlInterface(opts) {
        opts = opts || {};
    }
    
    new meta.Class( ControlInterface )
    
        .define_methods({
            handleKeyDown: function (keyCode) {
                // your code here
            },
    
            handleKeyUp: function (keyCode) {
                // your code here
            },
    
            handleMouseDown: function (targetX, targetY) {
                // your code here
            },
    
            handleMouseUp: function (targetX, targetY) {
                // your code here
            },
    
            handleMouseMove: function (targetX, targetY) {
                // your code here
            },
    
            handleMouseWheel: function (delta) {
                // your code here
            },
    
            handleRender: function () {
                // your code here
            }
        })
    ;

    module.exports = ControlInterface;
});

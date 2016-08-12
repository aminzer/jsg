define(function (require, exports, module) {
    var meta         = require('meta'),
        MovingObject = require('objects/moving-object'),
        Painter      = require('util/painter');

    function Cursor(opts, render) {
        opts = opts || {};
    
        MovingObject.call(this, opts);
    
        this._color = meta.common.first_defined( opts.color, 'rgba(0,0,255,0.1)' );
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( Cursor )
    
        .extend_from( MovingObject )
    
        .define_accessors([
            'color'
        ])
    
        .define_methods({
            render: function () {
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('#fff')
                        .drawRect(-12, -2, 9, 4)
                        .drawRect(3, -2, 9, 4)
                        .drawRect(-2, -12, 4, 9)
                        .drawRect(-2, 3, 4, 9)
    
                        .beginFill('#000')
                        .drawRect(-11, -1, 7, 2)
                        .drawRect(4, -1, 7, 2)
                        .drawRect(-1, -11, 2, 7)
                        .drawRect(-1, 4, 2, 7)
    
                        .beginFill(this.color)
                        .drawCircle(0, 0, 10);
                });
            }
        })
    ;

    module.exports = Cursor;
});

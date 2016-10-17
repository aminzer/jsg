define(function (require, exports, module) {
    var meta             = require('meta'),
        PositionedObject = require('objects/positioned-object'),
        Canvas           = require('widgets/canvas'),
        GameContext      = require('game-context');
    
    function ShapedObject(opts) {
        opts = opts || {};

        PositionedObject.call(this, opts);

        this._shapes = [];
    }

    new meta.Class( ShapedObject )

        .extend_from( PositionedObject )

        .define_methods({
            render: function () {
                /* override it to define initial look of object */
            },

            isPointInside: function (pointX, pointY) {
                /* override it to determine, if point is inside current object */
                return false;
            },

            addShape: function addShapeFunc(shape) {
                if (shape instanceof Array) {
                    shape.forEach(function (singleShape) {
                        addShapeFunc(singleShape);
                    });
                } else {
                    this._shapes.push(shape);
                    GameContext.instance.stage.addChild(shape);
                }
            },

            updateShapes: function () {
                this._shapes.forEach(function (shape) {
                    shape.x = Canvas.Scale.toReal(this.x);
                    shape.y = Canvas.Scale.toReal(this.y);
                    shape.rotation = this.angle;         // TODO accept delta = natural angle
                }, this);
            },

            destroyShapes: function () {
                this._shapes.forEach(function (shape) {
                    GameContext.instance.stage.removeChild(shape);
                });
                this._shapes = [];
            }
        })
    ;

    module.exports = ShapedObject;
});

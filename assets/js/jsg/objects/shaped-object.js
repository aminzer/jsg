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
                gctx.stage.addChild(shape);
            }
        },

        updateShapes: function () {
            this._shapes.forEach(function (shape) {
                shape.x = Canvas.Scale.convertToReal(this.x);
                shape.y = Canvas.Scale.convertToReal(this.y);
                shape.rotation = this.angle;         // TODO accept delta = natural angle
            }, this);
        },

        destroyShapes: function () {
            this._shapes.forEach(function (shape) {
                gctx.stage.removeChild(shape);
            });
            this._shapes = [];
        }
    })
;

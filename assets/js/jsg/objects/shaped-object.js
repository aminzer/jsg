function ShapedObject(opts) {
    opts = opts || {};

    PositionedObject.call(this, opts);

    this._shapes = [];
}

meta.Class( ShapedObject )

    .extend_from( PositionedObject )

    .define_methods({
        render: function () {
            /* override it to define initial look of object */
        },

        isPointInside: function(pointX, pointY) {
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
                _.stage().addChild(shape);
            }
        },

        updateShapes: function () {
            this._shapes.forEach(function (shape) {
                shape.x = Scale.getReal(this.x);
                shape.y = Scale.getReal(this.y);
                shape.rotation = this.angle;         // TODO accept delta = natural angle
            }, this);
        },

        destroyShapes: function () {
            this._shapes.forEach(function (shape) {
                _.stage().removeChild(shape);
            });
            this._shapes = [];
        }
    })
;

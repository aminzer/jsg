function ShapedObject(opts) {
    opts = opts || {};

    PositionedObject.call(this, opts);

    this._shapes = [];
}

meta.Class( ShapedObject ).extend_from( PositionedObject )

    .define_methods({
        render: function () {
            /* override it to define initial look of object */
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
                shape.x = Scale.getReal(this.getX());
                shape.y = Scale.getReal(this.getY());
                shape.rotation = this.getAngle();         // TODO accept delta = natural angle
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

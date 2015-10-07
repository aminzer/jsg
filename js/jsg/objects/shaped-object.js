function ShapedObject(opts) {
    opts = opts || {};

    PositionedObject.call(this, opts);

    this._shapes = [];
}

Extend(ShapedObject).from(PositionedObject);

ShapedObject.prototype.addShape = function(shape) {
    if (shape instanceof Array) {
        for (var i = 0; i < shape.length; i++) {
            this._shapes.push(shape[i]);
            gctx.getStage().addChild(shape[i]);
        }
    } else {
        this._shapes.push(shape);
        gctx.getStage().addChild(shape);
    }
};

ShapedObject.prototype.updateShapes = function() {
    for (var i = 0; i < this._shapes.length; i++) {
        this._shapes[i].x = Scale.getReal(this.getX());
        this._shapes[i].y = Scale.getReal(this.getY());
        this._shapes[i].rotation = this.getAngle();
    }
};

ShapedObject.prototype.destroyShapes = function() {
    for (var i = 0; i < this._shapes.length; i++) {
        gctx.getStage().removeChild(this._shapes[i]);
    }
    this._shapes = [];
};

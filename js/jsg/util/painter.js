var Painter = {
    shape: function (shapedObject, visualisationCallback) {
        var shape = new createjs.Shape();
        visualisationCallback.call(shapedObject, shape);
        shapedObject.addShape(shape);
        shape.scaleX = shape.scaleY = Canvas.Scale.ratio();
        return this;
    },

    offsetCircle: function (shapedObject, x, y, radius, color) {
        return this.shape(shapedObject, function (shape) {
            shape.graphics.beginFill(color).drawCircle(x, y, radius);
        });
    },

    circle: function (shapedObject, radius, color) {
        return this.offsetCircle(shapedObject, 0, 0, radius, color);
    },

    offsetRect: function (shapedObject, x, y, w, h, color) {
        return this.shape(shapedObject, function (shape) {
            shape.graphics.beginFill(color).drawRect(x, y, w, h);
        });
    },

    rect: function (shapedObject, w, h, color) {
        return this.offsetRect(shapedObject, -w / 2, -h / 2, w, h, color)
    },

    renderOffsetRoundRectShape: function (shapedObject, x, y, w, h, radius, color) {
        return this.shape(shapedObject, function (shape) {
            shape.graphics.beginFill(color).drawRoundRect(x, y, w, h, radius);
        });
    },

    renderRoundRectShape: function (shapedObject, w, h, radius, color) {
        return this.renderOffsetRoundRectShape(shapedObject, -w / 2, -h / 2, w, h, radius, color);
    }
};

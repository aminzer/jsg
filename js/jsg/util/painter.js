var Painter = function () {

    function scale(size) {
        return Canvas.Scale.toReal(size);
    }

    return {
        /**
         * @deprecated
         */
        offsetCircle: function (shapedObject, x, y, radius, color) {
            x = scale(x);
            y = scale(y);
            radius = scale(radius);

            var shape = new createjs.Shape();
            shape.graphics.beginFill(color).drawCircle(x, y, radius);
            shapedObject.addShape(shape);
            return shape;
        },

        /**
         * @deprecated
         */
        circle: function (shapedObject, radius, color) {
            return this.offsetCircle(shapedObject, 0, 0, radius, color);
        },

        /**
         * @deprecated
         */
        offsetRectangle: function (shapedObject, x, y, width, height, regX, regY, color) {
            x = scale(x);
            y = scale(y);
            width = scale(width);
            height = scale(height);
            regX = scale(regX);
            regY = scale(regY);

            var shape = new createjs.Shape();
            shape.graphics.beginFill(color).drawRect(x, y, width, height);
            shape.regX = regX;
            shape.regY = regY;
            shapedObject.addShape(shape);
            return shape;
        },

        /**
         * @deprecated
         */
        rectangle: function (shapedObject, width, height, regX, regY, color) {
            return this.offsetRectangle(shapedObject, 0, 0, width, height, regX, regY, color);
        },

        /**
         * @deprecated
         */
        offsetRoundRectangle: function (shapedObject, x, y, width, height, regX, regY, radius, color) {
            x = scale(x);
            y = scale(y);
            width = scale(width);
            height = scale(height);
            regX = scale(regX);
            regY = scale(regY);
            radius = scale(radius);

            var shape = new createjs.Shape();
            shape.graphics.beginFill(color).drawRoundRect(x, y, width, height, radius);
            shape.regX = regX;
            shape.regY = regY;
            shapedObject.addShape(shape);
            return shape;
        },

        /**
         * @deprecated
         */
        roundRectangle: function (shapedObject, width, height, regX, regY, radius, color) {
            return this.offsetRoundRectangle(shapedObject, 0, 0, width, height, regX, regY, radius, color);
        },

        renderShape: function (shapedObject, visualisationCallback) {
            var shape = new createjs.Shape();
            visualisationCallback.call(shapedObject, shape);
            shapedObject.addShape(shape);
            shape.scaleX = shape.scaleY = Canvas.Scale.ratio();
            return this;
        },

        renderOffsetCircleShape: function (shapedObject, x, y, radius, color) {
            return this.renderShape(shapedObject, function (shape) {
                shape.graphics.beginFill(color).drawCircle(x, y, radius);
            });
        },

        renderCircleShape: function (shapedObject, radius, color) {
            return this.renderOffsetCircleShape(shapedObject, 0, 0, radius, color);
        },

        renderOffsetRectShape: function (shapedObject, x, y, w, h, color) {
            return this.renderShape(shapedObject, function (shape) {
                shape.graphics.beginFill(color).drawRect(x, y, w, h);
            });
        },

        renderRectShape: function (shapedObject, w, h, color) {
            return this.renderOffsetRectShape(shapedObject, -w / 2, -h / 2, w, h, color)
        },

        renderOffsetRoundRectShape: function (shapedObject, x, y, w, h, radius, color) {
            return this.renderShape(shapedObject, function (shape) {
                shape.graphics.beginFill(color).drawRoundRect(x, y, w, h, radius);
            });
        },

        renderRoundRectShape: function (shapedObject, w, h, radius, color) {
            return this.renderOffsetRoundRectShape(shapedObject, -w / 2, -h / 2, w, h, radius, color);
        }
    };
}();

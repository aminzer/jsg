var Painter = function () {

    function scale(size) {
        return Canvas.Scale.convertToReal(size);
    }

    return {
        offsetCircle: function (shapedObject, x, y, radius, color) {
            x = scale(x);
            y = scale(y);
            radius = scale(radius);

            var shape = new createjs.Shape();
            shape.graphics.beginFill(color).drawCircle(x, y, radius);
            shapedObject.addShape(shape);
            return shape;
        },

        circle: function (shapedObject, radius, color) {
            return this.offsetCircle(shapedObject, 0, 0, radius, color);
        },

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

        rectangle: function (shapedObject, width, height, regX, regY, color) {
            return this.offsetRectangle(shapedObject, 0, 0, width, height, regX, regY, color);
        },

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

        roundRectangle: function (shapedObject, width, height, regX, regY, radius, color) {
            return this.offsetRoundRectangle(shapedObject, 0, 0, width, height, regX, regY, radius, color);
        }
    };
}();

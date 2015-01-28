var Painter = {

    offsetCircle: function(object, x, y, radius, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawCircle(x, y, radius);
        object.addShape(shape);
    },

    circle: function(object, radius, color) {
        this.offsetCircle(object, 0, 0, radius, color);
    },

    offsetRectangle: function(object, x, y, width, height, regX, regY, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawRect(x, y, width, height);
        shape.regX = regX;
        shape.regY = regY;
        object.addShape(shape);
    },

    rectangle: function(object, width, height, regX, regY, color) {
        this.offsetRectangle(object, 0, 0, width, height, regX, regY, color);
    },

    offsetRoundRectangle: function(object, x, y, width, height, regX, regY, radius, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawRoundRect(x, y, width, height, radius);
        shape.regX = regX;
        shape.regY = regY;
        object.addShape(shape);
    },

    roundRectangle: function(object, width, height, regX, regY, radius, color) {
        this.offsetRoundRectangle(object, 0, 0, width, height, regX, regY, radius, color);
    }
};

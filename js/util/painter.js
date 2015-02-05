var Painter = {

    offsetCircle: function(shapedObject, x, y, radius, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawCircle(x, y, radius);
        shapedObject.addShape(shape);
    },

    circle: function(shapedObject, radius, color) {
        this.offsetCircle(shapedObject, 0, 0, radius, color);
    },

    offsetRectangle: function(shapedObject, x, y, width, height, regX, regY, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawRect(x, y, width, height);
        shape.regX = regX;
        shape.regY = regY;
        shapedObject.addShape(shape);
    },

    rectangle: function(shapedObject, width, height, regX, regY, color) {
        this.offsetRectangle(shapedObject, 0, 0, width, height, regX, regY, color);
    },

    offsetRoundRectangle: function(shapedObject, x, y, width, height, regX, regY, radius, color) {
        var shape = new createjs.Shape();
        shape.graphics.beginFill(color).drawRoundRect(x, y, width, height, radius);
        shape.regX = regX;
        shape.regY = regY;
        shapedObject.addShape(shape);
    },

    roundRectangle: function(shapedObject, width, height, regX, regY, radius, color) {
        this.offsetRoundRectangle(shapedObject, 0, 0, width, height, regX, regY, radius, color);
    }
};

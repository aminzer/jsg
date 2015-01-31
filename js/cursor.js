function Cursor(opts, draw) {
    var self = ShapedObject(opts);

    self.draw = function() {
        var bitmap = new createjs.Bitmap("./img/cursor.png");
        bitmap.regX = 6;
        bitmap.regY = 6;
        bitmap.skewX = 20;
        bitmap.skewY = 20;
        self.addShape(bitmap);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}

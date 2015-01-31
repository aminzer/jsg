function Cursor(opts, draw) {
    var self = ShapedObject(opts);

    self.draw = function() {
        var bitmap = new createjs.Bitmap("./img/cursor.png");
        bitmap.regX = 6;
        bitmap.regY = 6;
        self.addShape(bitmap);
    };

    if (draw !== false) {
        self.draw();
    }

    return self;
}
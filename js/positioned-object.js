function PositionedObject(opts) {
    var self = {};

    var _x = opts.x || 0;
    var _y = opts.y || 0;
    var _angle = opts.angle || 0;

    self.setX = function(x) {
        _x = x;
    };

    self.setY = function(y) {
        _y = y;
    };

    self.moveX = function(dx) {
        _x += dx;
    };

    self.moveY = function(dy) {
        _y += dy;
    };

    self.getX = function() {
        return _x;
    };

    self.getY = function() {
        return _y;
    };

    self.setAngle = function(angle) {
        _angle = angle;
    };

    self.getAngle = function() {
        return _angle;
    };

    return self;
}

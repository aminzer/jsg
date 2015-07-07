function PositionedObject(opts) {
    var self = {};

    self.x = opts.x || 0;
    self.y = opts.y || 0;
    self.angle = opts.angle || 0;
    self.naturalAngle = opts.naturalAngle || 0;

    self.moveX = function(deltaX) {
        self.x += deltaX;
    };

    self.moveY = function(deltaY) {
        self.y += deltaY;
    };

    return self;
}

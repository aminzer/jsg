function ShapedObject(opts) {
    var self = PositionedObject(opts);

    /**
     * CreateJS stage
     * @type {createjs.Stage}
     * @private
     */
    self._stage = opts.stage;

    /**
     * all CreateJS shapes attached to current object (fixed position, not weapons, etc)
     * @type {Array}
     * @private
     */
    self._shapes = [];

    /**
     * get type of current object (see config.js)
     * @returns {string}
     */
    self.getObjectType = function() {
        return 0;
    };

    /**
     * add shape (or array of shapes) to object's shape array and to stage
     * @param shape - CreateJS shape (or array of shapes) to add
     */
    self.addShape = function(shape) {
        if (shape instanceof Array) {
            for (var i = 0; i < shape.length; i++) {
                self._shapes.push(shape[i]);
                self._stage.addChild(shape[i]);
            }
        } else {
            self._shapes.push(shape);
            self._stage.addChild(shape);
        }
    };

    /**
     * update all graphical shapes on stage
     */
    self.updateShapes = function() {
        for (var i = 0; i < self._shapes.length; i++) {
            self._shapes[i].x = self.x;
            self._shapes[i].y = self.y;
            self._shapes[i].rotation = self.angle;
        }
    };

    /**
     * must be overridden
     * @returns {boolean} - true - object is alive, false - object is already dead and must be destroyed
     */
    self.move = function() {
        return true;
    };

    /**
     * remove all shapes from stage
     */
    self.destroyShapes = function() {
        for (var i = 0; i < self._shapes.length; i++) {
            self._stage.removeChild(self._shapes[i]);
        }
        self._shapes = [];
    };

    return self;
}

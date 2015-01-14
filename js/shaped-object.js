function ShapedObject(opts) {
    var self = PositionedObject(opts);

    /**
     * CreateJS stage
     * @type {createjs.Stage}
     * @private
     */
    var _stage = opts.stage;

    /**
     * all CreateJS shapes attached to current object (fixed position, not weapons, etc)
     * @type {Array}
     * @private
     */
    var _shapes = [];

    /**
     * get drawing stage of current object
     * @returns {createjs.Stage}
     */
    self.getStage = function() {
        return _stage;
    };

    /**
     * get type of current object (like bullet, unit etc)
     * @returns {string}
     */
    self.getObjectType = function() {
        return "shaped_object";
    };

    /**
     * add shape (or array of shapes) to object's shape array and to stage
     * @param shape - CreateJS shape (or array of shapes) to add
     */
    self.addShape = function(shape) {
        if (shape instanceof Array) {
            for (var i = 0; i < shape.length; i++) {
                _shapes.push(shape[i]);
                _stage.addChild(shape[i]);
            }
        } else {
            _shapes.push(shape);
            _stage.addChild(shape);
        }
    };

    /**
     * update all graphical shapes on stage
     */
    self.updateShapes = function() {
        for (var i = 0; i < _shapes.length; i++) {
            _shapes[i].x = self.getX();
            _shapes[i].y = self.getY();
            _shapes[i].rotation = self.getAngle();
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
        for (var i = 0; i < _shapes.length; i++) {
            _stage.removeChild(_shapes[i]);
        }
        _shapes = [];
    };

    return self;
}

var CANVAS = function(){
    var VIRTUAL_WIDTH = 1600;
    var VIRTUAL_HEIGHT = 900;

    var _width = 0;
    var _height = 0;

    return {

        getVirtualWidth: function() {
            return VIRTUAL_WIDTH;
        },

        getVirtualHeight: function() {
            return VIRTUAL_HEIGHT;
        },

        getWidth: function() {
            return _width;
        },

        getHeight: function() {
            return _height;
        },

        setAndValidateSize: function(opts) {
            _width = opts.width;
            _height = opts.height;

            if (_width / VIRTUAL_WIDTH < _height / VIRTUAL_HEIGHT) {
                _height = _width * VIRTUAL_HEIGHT / VIRTUAL_WIDTH;
            } else {
                _width = _height * VIRTUAL_WIDTH / VIRTUAL_HEIGHT;
            }

            if (opts.canvasElem) {
                opts.canvasElem.width = _width;
                opts.canvasElem.height = _height;
            }
        }
    }
}();

var NO_MOVEMENT = 'NO_MOVEMENT';

var OBJECT_TYPE = {
    UNDEFINED:  parseInt("0000000", 16),
    PLAYER:     parseInt("0000001", 16),
    ENEMY:      parseInt("0000002", 16),
    NEUTRAL:    parseInt("0000003", 16)
};

var PI = Math.PI;
var sin = Math.sin;
var cos = Math.cos;
var sin_d = function(x) { return sin(PI / 180 * x) };
var cos_d = function(x) { return cos(PI / 180 * x) };
var random = Math.random;

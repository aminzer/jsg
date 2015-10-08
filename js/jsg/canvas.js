var CANVAS = function(opts) {
    opts = opts || {};

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

var Canvas = function() {
    var self = {
        _width: 0,
        _height: 0
    };

    Object.defineProperties(self, {
        virtualWidth: {
            value: 1600,
            writable: false,
            configurable: false
        },

        virtualHeight: {
            value: 900,
            writable: false,
            configurable: false
        },

        width: {
            get: function () {
                return self._width;
            }
        },

        height: {
            get: function () {
                return self._height;
            }
        }
    });

    self.setAndValidateSize = function(opts) {
        self._width = opts.width;
        self._height = opts.height;

        if (self.width / self.virtualWidth < self.height / self.virtualHeight) {
            self._height = self.width * self.virtualHeight / self.virtualWidth;
        } else {
            self._width = self.height * self.virtualWidth / self.virtualHeight;
        }

        if (opts.canvasElem) {
            opts.canvasElem.width = self.width;
            opts.canvasElem.height = self.height;
        }
    };

    self.Scale = {
        convertToReal: function(virtualSizeOfObject) {
            return virtualSizeOfObject * self.width / self.virtualWidth;
        },

        convertToVirtual: function(realSizeOfObject) {
            return realSizeOfObject * self.virtualWidth / self.width;
        }
    };

    return self;
}();

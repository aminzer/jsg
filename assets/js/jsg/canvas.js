var Canvas = function() {
    var self = {};

    var _width = 0;
    var _height = 0;

    var $node = null;

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
            get: function () { return _width }
        },

        height: {
            get: function () { return _height }
        },

        $node: {
            get: function () {
                if (!$node) render();
                return $node;
            }
        },

        htmlElement: {
            get: function () { return $node ? $node.get(0) : null }
        },

        id: {
            get: function () { return $node ? $node.attr('id') : null }
        }
    });

    self.initialize = function (opts) {
        opts = opts || {};

        _width = opts.width || $(document.body).width();
        _height = opts.height || $(document.body).height();

        if (self.width / self.virtualWidth < self.height / self.virtualHeight) {
            _height = self.width * self.virtualHeight / self.virtualWidth;
        } else {
            _width = self.height * self.virtualWidth / self.virtualHeight;
        }

        return self;
    };

    self.render = render;

    self.Scale = {
        convertToReal: function (virtualSizeOfObject) {
            return virtualSizeOfObject * self.width / self.virtualWidth;
        },

        convertToVirtual: function (realSizeOfObject) {
            return realSizeOfObject * self.virtualWidth / self.width;
        }
    };

    function render(renderOpts) {
        renderOpts = renderOpts || {};

        $node = $('<canvas></canvas>').attr({
            id: renderOpts.canvasId || 'stage-canvas',
            width: self.width,
            height: self.height
        });

        if (renderOpts.$parent) renderOpts.$parent.append($node);

        return $node;
    }

    return self;
}();

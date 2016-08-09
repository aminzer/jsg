define(function (require, exports, module) {
    var $ = require('jquery');

    var Canvas = {};

    var _width = 0;
    var _height = 0;
    var $node = null;

    Object.defineProperties(Canvas, {
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

    Canvas.initialize = function (opts) {
        opts = opts || {};

        _width = opts.width || $(document.body).width();
        _height = opts.height || $(document.body).height();

        if (Canvas.width / Canvas.virtualWidth < Canvas.height / Canvas.virtualHeight) {
            _height = Canvas.width * Canvas.virtualHeight / Canvas.virtualWidth;
        } else {
            _width = Canvas.height * Canvas.virtualWidth / Canvas.virtualHeight;
        }

        return Canvas;
    };

    Canvas.render = render;

    Canvas.Scale = {
        ratio: function () { return Canvas.width / Canvas.virtualWidth },
        toReal: function (virtualSize) { return virtualSize * this.ratio() },
        toVirtual: function (realSize) { return realSize / this.ratio() }
    };

    function render(renderOpts) {
        renderOpts = renderOpts || {};

        $node = $('<canvas></canvas>').attr({
            id: renderOpts.canvasId || 'stage-canvas',
            width: Canvas.width,
            height: Canvas.height
        });

        if (renderOpts.$parent) renderOpts.$parent.append($node);

        return $node;
    }

    module.exports = Canvas;
});

define(function (require, exports, module) {
    var $ = require('jquery');

    var Canvas = {};

    var _realWidth = 0;
    var _realHeight = 0;
    var $node = null;

    Object.defineProperties(Canvas, {
        width: {
            value: 1600,
            writable: false,
            configurable: false
        },

        height: {
            value: 900,
            writable: false,
            configurable: false
        },

        w: {
            get: function () { return this.width }
        },

        h: {
            get: function () { return this.height }
        },

        realWidth: {
            get: function () { return _realWidth }
        },

        realHeight: {
            get: function () { return _realHeight }
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

        _realWidth = opts.width || $(document.body).width();
        _realHeight = opts.height || $(document.body).height();

        if (Canvas.realWidth / Canvas.width < Canvas.realHeight / Canvas.height) {
            _realHeight = Canvas.realWidth * Canvas.height / Canvas.width;
        } else {
            _realWidth = Canvas.realHeight * Canvas.width / Canvas.height;
        }

        return Canvas;
    };

    Canvas.render = render;

    Canvas.Scale = {
        ratio: function () { return Canvas.realWidth / Canvas.width },
        toReal: function (virtualSize) { return virtualSize * this.ratio() },
        toVirtual: function (realSize) { return realSize / this.ratio() }
    };

    function render(renderOpts) {
        renderOpts = renderOpts || {};

        $node = $('<canvas></canvas>').attr({
            id: renderOpts.canvasId || 'stage-canvas',
            width: Canvas.realWidth,
            height: Canvas.realHeight
        });

        if (renderOpts.$parent) renderOpts.$parent.append($node);

        return $node;
    }

    module.exports = Canvas;
});

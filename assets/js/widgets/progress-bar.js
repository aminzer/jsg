function ProgressBar(opts) {
    opts = opts || {};

    var _progress = opts.progress || 1;

    var $node = null;
    var $progressNode = null;

    var _setProgressNodeWidth;
    if (typeof opts.animationDelay == 'undefined' || opts.animationDelay) {
        _setProgressNodeWidth = function () {
            $progressNode.animate({width: toPercents()}, opts.animationDelay || 100);
        };
    } else {
        _setProgressNodeWidth = function () {
            $progressNode.css('width', toPercents());
        };
    }

    Object.defineProperties(this, {
        $node: {
            get: function () {
                if (!$node) render();
                return $node;
            }
        }
    });

    this.setProgress = setProgress;
    this.render = render;

    function render() {
        $progressNode = $('<div class="progress-bar__progress"></div>').css({
            'width': toPercents(),
            'background-color': opts.color
        });
        $node = $('<div class="progress-bar"></div>').append($progressNode);

        if (opts.$parent) opts.$parent.append($node);

        return $node;
    }

    function setProgress(progress) {
        if (_progress != progress) {
            _progress = progress;
            _setProgressNodeWidth();
        }
    }

    function toPercents() {
        return 100 * _progress + '%';
    }
}

function ProgressBar(opts) {
    opts = opts || {};

    var _progress = opts.progress || 1;

    var $node = null;
    var $progressNode = null;

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
        $node = $('<div class="progress-bar"></div>')
            .css('border', opts.noBorder ? 'none' : '')
            .append($progressNode);

        if (opts.$parent) opts.$parent.append($node);

        return $node;
    }

    function setProgress(progress) {
        if (_progress != progress) {
            _progress = progress;
            $progressNode.css('width', toPercents());  // TODO fix animation (jquery is not fine. it become shit, when setProgress calls interval is less, than animation time)
        }
    }

    function toPercents() {
        return 100 * _progress + '%';
    }
}

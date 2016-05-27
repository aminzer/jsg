function PlayerPanel(opts) {
    opts = opts || {};

    // TODO set players id after (or pointer on unit object)
    var _playerId = opts.playerId || null;
    var _hpBar = null;

    var $node;

    initHandlers();

    Object.defineProperties(this, {
        $node: {
            get: function () {
                if (!$node) render();
                return $node;
            }
        }
    });

    this.render = render;

    function render() {
        _hpBar = new ProgressBar();

        $node = $('<div></div>')
            .attr({
                id: 'player-panel-' + _playerId,
                class: 'player-panel'
            })
            .append(_hpBar.render());

        if (opts.$parent) opts.$parent.append($node);

        return $node;
    }

    function initHandlers() {
        $(document).bind("player_hp_change", function(e, playerId, hp, maxHp) {
            if (_playerId == playerId) {
                _hpBar.setProgress(hp / maxHp);
            }
        });
    }
}

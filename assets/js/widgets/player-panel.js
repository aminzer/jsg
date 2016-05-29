function PlayerPanel(opts) {
    opts = opts || {};

    var _playerId = null;
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
    this.setPlayerId = setPlayerId;

    function render(opts) {
        opts = opts || {};

        _hpBar = new ProgressBar();

        $node = $('<div></div>')
            .attr({
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

    function setPlayerId(playerId) {
        _playerId = playerId;
    }
}

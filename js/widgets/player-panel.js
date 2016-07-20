function PlayerPanel(opts) {
    opts = opts || {};

    var _playerId = null;
    var _hpBar = null;

    var $node;

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

    function render(renderOpts) {
        renderOpts = renderOpts || {};

        _hpBar = new ProgressBar({
            noBorder: true,
            color: opts.color || null
        });

        $node = $('<div></div>')
            .attr({
                class: 'player-panel'
            })
            .append(_hpBar.render());

        if (renderOpts.$parent) renderOpts.$parent.append($node);

        return $node;
    }

    function setPlayerId(playerId) {
        _playerId = playerId;
        initHandlers();
    }

    function initHandlers() {
        $(document).bind("player_hp_change", function (e, playerId, hp, maxHp) {
            if (_playerId == playerId) {
                _hpBar.setProgress(hp / maxHp);
            }
        });
        $(document).bind("player_death", function (e, playerId) {
            if (_playerId == playerId) {
                _hpBar.setProgress(0);
            }
        });
    }
}

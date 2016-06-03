var PlayerPanelHolder = function PlayerPanelHolder() {
    var self = {};

    var _playerPanels = [];

    var $node = null;

    Object.defineProperties(self, {
        $node: {
            get: function () {
                if (!$node) render();
                return $node;
            }
        }
    });

    self.initialize = function (opts) {
        opts = opts || {};

        for (var i = 1; i <= (opts.playerCount || 1); i++) {
            _playerPanels.push(new PlayerPanel({
                color: i == 2 ? '#FF860D' : null
            }));
        }

        return self;
    };

    self.render = render;

    self.bindToPlayers = function () {
        _playerPanels.forEach(function (playerPanel, i) {
            if (_.players[i]) {
                playerPanel.setPlayerId(_.players[i].id);
            }
        });
    };

    self.getHeight = function () {
        return $node.height();
    };

    function render(opts) {
        opts = opts || {};

        $node = $('<div class="player-panel-holder"></div>');
        _playerPanels.forEach(function (playerPanel) {
            $node.append(playerPanel.render());
        });

        if (opts.$parent) opts.$parent.append($node);

        return $node;
    }

    return self;
}();

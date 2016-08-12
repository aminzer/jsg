define(function (require, exports, module) {
    var $           = require('jquery'),
        PlayerPanel = require('widgets/player-panel'),
        GameContext = require('game-context');

    var PlayerPanelHolder = function () {
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
                if (GameContext.instance().players.get_by_index(i)) {
                    playerPanel.setPlayerId(GameContext.instance().players.get_by_index(i).id);
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

    module.exports = PlayerPanelHolder;
});

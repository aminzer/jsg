function PlayerPanel(opts) {
    opts = opts || opts;

    var self = {};

    var _players = [];
    var _panel = $("#player-panel");
    var _hpPanels = [];

    var _colors = {
        hpColor1: "#73B500",
        hpColor2: "#FF860D",
        hpColor3: "red"
    };

    self.setPlayers = function(players) {
        _players = players;
    };

    self.construct = function() {
        for (var i = 0; i < _players.length; i++) {
            var hpPanel = ProgressBar();
            var type = (i == 0) ? 'success' : 'warning';
            _panel.append(hpPanel.generateHtml({
                 type: type
            }));
            hpPanel.setProgress(1);
            _hpPanels.push(hpPanel);
        }
        initHandlers();
    };

    function initHandlers() {
        $(document).bind("player_hp_change", function(e, playerId, hp, maxHp) {
            var hpPanel = getHpPanel(playerId);
            if (hpPanel) {
                hpPanel.setProgress(hp / maxHp);
            }
        });
    }

    function getHpPanel(playerId) {
        for (var i = 0; i < _players.length; i++) {
            if (_players[i].getId() === playerId) {
                return _hpPanels[i];
            }
        }
        return null;
    }

    return self;
}

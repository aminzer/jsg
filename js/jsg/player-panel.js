function PlayerPanel(opts) {
    var self = {};

    var _kills = 0;

    var _panel = $("#player-panel");
    var _hpPanel = _panel.find(".hp-panel");
    var _hpLoading = _hpPanel.find(".hp");
    var _killsPanel = _panel.find(".kills-panel");

    self.initHandlers = function() {
        $(document).bind("player_hp_change", function(e, hp, maxHp) {
            _hpLoading.css({"width": 100 * hp / maxHp + "%"});
        });

        $(document).bind("enemy_died", function(e) {
            _killsPanel.html(++_kills)
        });
    };

    return self;
}

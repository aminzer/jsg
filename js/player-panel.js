function PlayerPanel(opts) {
    var self = new {};

    var _player = opts.player;
    
    self.getHp = function() {
        return _player.getHp();
    };

    self.getMaxHp = function() {
        return _player.getHp();
    };

    return self;
}

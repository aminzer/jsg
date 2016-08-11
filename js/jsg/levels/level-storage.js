var LevelStorage = function () {
    var self = {};

    var _storage = {};

    self.initialize = function () {
        var levelDefinitions = [
            new LevelDefinition1(),
            new LevelDefinition2(),
            new LevelDefinition3()
        ];

        levelDefinitions.forEach(function (levelDefinition) {
            self.add(levelDefinition);
        });
    };

    self.add = function (levelDefinition) {
        _storage[levelDefinition.id] = levelDefinition;
    };

    self.get = function (levelId) {
        return _storage[levelId];
    };

    self.getAll = function () {
        return _storage;
    };

    return self;
}();

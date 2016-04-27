var LevelStorage = function() {
    var _storage = {};

    return {

        add: function(name, definition) {
            _storage[name] = definition;
        },

        get: function(name) {
            return _storage[name];
        },

        getAll: function() {
            return _storage;
        }
    };
}();

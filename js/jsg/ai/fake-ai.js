define(function (require, exports, module) {
    var meta        = require('meta'),
        OBJECT_TYPE = require('const/object-type'),
        GameContext = require('game-context');

    function FakeAI() { }
    
    new meta.Class( FakeAI )
    
        .define_methods({
            resolve: function () {
                // your code here
                // called every tick
            },
    
            _isControllable: function (unit) {
                return unit.objectType === OBJECT_TYPE.ENEMY;
            },
    
            _getTargets: function () {
                return GameContext.instance().players;
            }
        })
    ;

    module.exports = FakeAI;
});

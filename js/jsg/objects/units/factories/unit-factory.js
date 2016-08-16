define(function (require, exports, module) {
    var meta          = require('meta'),
        Canvas        = require('widgets/canvas'),
        ENEMY_FACTORY = require('const/physics/enemy-factory'),
        GameContext   = require('game-context');

    function UnitFactory(opts) {
        opts = opts || {};
    
        this._generatingDelay = opts.generatingDelay || ENEMY_FACTORY.DEFAULT.GENERATING_DELAY;
        this. _creationTimer = null;
    
        this._enemyConstructors = opts.enemyConstructors || [];
    }
    
    new meta.Class( UnitFactory )
    
        .define_methods({
            startGenerating: function () {
                this._creationTimer = setInterval(function () {
                    var constructor = this._getConstructor.call(this);
                    var constructorOpts = this._getConstructorOpts.call(this, constructor);
                    GameContext.instance().units.add(new constructor(constructorOpts));
                }.bind(this), this._generatingDelay);
            },
    
            stopGenerating: function () {
                clearInterval(this._creationTimer);
                this._creationTimer = null;
            },
    
            isGenerating: function () {
                return this._creationTimer != null;
            },
    
            _getConstructor: function () {
                if (meta.common.has_method(this._enemyConstructors, 'get')) {
                    return this._enemyConstructors.get()
                }
                if (meta.common.is_array(this._enemyConstructors)) {
                    return this._enemyConstructors[Math.floor(this._enemyConstructors.length * Math.random())];
                }
                throw new Error('Unknown data structure');
            },
    
            _getConstructorOpts: function (constructor) {
                return {
                    x: Canvas.w * (Math.random() / 2 + 0.5),
                    y: Canvas.h * (Math.random() / 2 + 0.5)
                };
            }
        })
    ;

    module.exports = UnitFactory;
});

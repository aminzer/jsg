define(function (require, exports, module) {
    var createjs  = require('createjs'),
        meta      = require('meta'),
        WeaponSet = require('objects/weapons/weapon-set');

    function LevelDefinition(opts) {
        opts = opts || {};
    
        this._id = opts.id || createjs.UID.get();
        this._name = opts.name || 'Unknown Level';
        this._description = opts.description || '';
    }
    
    new meta.Class( LevelDefinition )
    
        .define_accessors([
            'id',
            'name',
            'description'
        ])
    
        .define_readers({
            players: function () {
                return [
                    {
                        x: 400,
                        y: 450,
                        weaponSet: WeaponSet.full()
                    }
                ];
            },
    
            enemies : function () { return [] },
            effects : function () { return [] },
            enemyFactory: function () { return null }
        })
    ;

    module.exports = LevelDefinition;
});

define(function (require, exports, module) {
    var meta                 = require('meta'),
        RandomAccessArray    = require('random-access-array'),
        UnitFactory          = require('objects/units/factories/unit-factory'),
        FootSoldier          = require('objects/units/foot-soldier'),
        GuyWithPanzerschreck = require('objects/units/guy-with-panzerschreck'),
        MachineGunner        = require('objects/units/machine-gunner'),
        Recruit              = require('objects/units/recruit');

    function EnemyFactory(opts) {
        opts = new meta.Hash( opts ).merge({
            enemyConstructors: new RandomAccessArray([
                {element: Recruit, weight: 10},
                {element: FootSoldier, weight: 5},
                {element: MachineGunner, weight: 2},
                {element: GuyWithPanzerschreck, weight: 1}
            ])
        }).to_obj();
    
        UnitFactory.call(this, opts);
    }
    
    new meta.Class( EnemyFactory )
    
        .extend_from( UnitFactory )
    ;

    module.exports = EnemyFactory;
});

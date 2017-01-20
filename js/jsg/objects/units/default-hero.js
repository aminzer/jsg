define(function (require, exports, module) {
    var meta   = require('meta'),
        PLAYER = require('const/physics/player'),
        Tommy  = require('objects/units/tommy');

    function DefaultHero(opts, render) {
        opts = new meta.Hash( opts ).add_defaults({
            speed: PLAYER.SPEED,
            maxHp: PLAYER.HP,
            mainColor: '#73B500',
            extraColor: '#345200'
        }).to_obj();
    
        Tommy.call(this, opts, render);
    }
    
    new meta.Class( DefaultHero )
    
        .extend_from( Tommy )
    ;

    module.exports = DefaultHero;
});

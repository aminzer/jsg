define(function (require, exports, module) {
    var meta         = require('meta'),
        Tommy        = require('objects/units/tommy'),
        AutomaticGun = require('objects/weapons/automatic-gun'),
        WeaponSet    = require('objects/weapons/weapon-set');

    function FootSoldier(opts, render) {
        opts = new meta.Hash( opts ).add_defaults({
            weaponSet: WeaponSet.oneGun(new AutomaticGun({}, false)),
            mainColor: '#559',
            extraColor: '#199EE0'
        }).to_obj();
    
        Tommy.call(this, opts, render);
    }
    
    new meta.Class( FootSoldier )
    
        .extend_from( Tommy )
    ;

    module.exports = FootSoldier;
});

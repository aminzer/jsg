define(function (require, exports, module) {
    var meta            = require('meta'),
        Tommy           = require('objects/units/tommy'),
        GrandfathersGun = require('objects/weapons/grandfathers-gun'),
        WeaponSet       = require('objects/weapons/weapon-set');

    function Recruit(opts, render) {
        opts = new meta.Hash( opts ).add_defaults({
            weaponSet: WeaponSet.oneGun(new GrandfathersGun({}, false)),
            mainColor: '#199EE0',
            extraColor: '#559'
        }).to_obj();
    
        Tommy.call(this, opts, render);
    }
    
    new meta.Class( Recruit )
    
        .extend_from( Tommy )
    ;

    module.exports = Recruit;
});

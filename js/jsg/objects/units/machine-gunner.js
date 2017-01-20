define(function (require, exports, module) {
    var meta       = require('meta'),
        Tommy      = require('objects/units/tommy'),
        MachineGun = require('objects/weapons/machine-gun'),
        WeaponSet  = require('objects/weapons/weapon-set');

    function MachineGunner(opts, render) {
        opts = new meta.Hash( opts ).add_defaults({
            weaponSet: WeaponSet.oneGun(new MachineGun({}, false)),
            mainColor: '#E08A19',
            extraColor: '#7A4D11'
        }).to_obj();
    
        Tommy.call(this, opts, render);
    }
    
    new meta.Class( MachineGunner )
    
        .extend_from( Tommy )
    ;

    module.exports = MachineGunner;
});

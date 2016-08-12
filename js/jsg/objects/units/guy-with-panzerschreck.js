define(function (require, exports, module) {
    var meta           = require('meta'),
        Tommy          = require('objects/units/tommy'),
        RocketLauncher = require('objects/weapons/rocket-launcher'),
        WeaponSet      = require('objects/weapons/weapon-set');

    function GuyWithPanzerschreck(opts, render) {
        opts = new meta.Hash( opts ).merge({
            weaponSet: WeaponSet.oneGun(new RocketLauncher({}, false)),
            mainColor: '#8D91E3',
            extraColor: '#34378A'
        }).to_obj();
    
        Tommy.call(this, opts, render);
    }
    
    new meta.Class( GuyWithPanzerschreck )
    
        .extend_from( Tommy )
    ;

    module.exports = GuyWithPanzerschreck;
});

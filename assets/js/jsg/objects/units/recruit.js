function Recruit(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new GrandfathersGun({}, false)),
        mainColor: '#199EE0',
        extraColor: '#559'
    });

    Tommy.call(this, opts, render);
}

meta.Class( Recruit )

    .extend_from( Tommy )
;

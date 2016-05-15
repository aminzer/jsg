function Recruit(opts, render) {
    opts = new meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new GrandfathersGun({}, false)),
        mainColor: '#199EE0',
        extraColor: '#559'
    }).to_obj();

    Tommy.call(this, opts, render);
}

meta.Class( Recruit )

    .extend_from( Tommy )
;

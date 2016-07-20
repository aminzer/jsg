function FootSoldier(opts, render) {
    opts = new meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new AutomaticGun({}, false)),
        mainColor: '#559',
        extraColor: '#199EE0'
    }).to_obj();

    Tommy.call(this, opts, render);
}

new meta.Class( FootSoldier )

    .extend_from( Tommy )
;

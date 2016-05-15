function GuyWithPanzerschreck(opts, render) {
    opts = new meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new RocketLauncher({}, false)),
        mainColor: '#8D91E3',
        extraColor: '#34378A'
    }).to_obj();

    Tommy.call(this, opts, render);
}

meta.Class( GuyWithPanzerschreck )

    .extend_from( Tommy )
;

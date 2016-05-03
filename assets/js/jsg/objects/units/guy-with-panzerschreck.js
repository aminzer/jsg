function GuyWithPanzerschreck(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new RocketLauncher({}, false)),
        mainColor: '#8D91E3',
        extraColor: '#34378A'
    });

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( GuyWithPanzerschreck )

    .extend_from( Tommy )
;

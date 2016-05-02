function FootSoldier(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new AutomaticGun({}, false)),
        mainColor: '#559',
        extraColor: '#199EE0'
    });

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(FootSoldier).from(Tommy);

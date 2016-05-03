function MachineGunner(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new MachineGun({}, false)),
        mainColor: '#E08A19',
        extraColor: '#7A4D11'
    });

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( MachineGunner )

    .extend_from( Tommy )
;

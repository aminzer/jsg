function MachineGunner(opts, render) {
    opts = new meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new MachineGun({}, false)),
        mainColor: '#E08A19',
        extraColor: '#7A4D11'
    }).to_obj();

    Tommy.call(this, opts, render);
}

meta.Class( MachineGunner )

    .extend_from( Tommy )
;

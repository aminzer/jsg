function MachineGunner(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new MachineGun({}, false)));
    this.setIfUndefined(opts, 'mainColor', '#E08A19');
    this.setIfUndefined(opts, 'extraColor', '#7A4D11');

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(MachineGunner).from(Tommy);

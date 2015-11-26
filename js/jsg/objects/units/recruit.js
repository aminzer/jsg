function Recruit(opts, render) {
    opts = opts || {};

    this.setIfUndefined(opts, 'weaponSet', WeaponSet.oneGun(new GrandfathersGun({}, false)));
    this.setIfUndefined(opts, 'mainColor', '#199EE0');
    this.setIfUndefined(opts, 'extraColor', '#559');

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

Extend(Recruit).from(Tommy);

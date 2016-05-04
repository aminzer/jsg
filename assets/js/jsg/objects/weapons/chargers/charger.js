function Charger(opts) {
    opts = opts || {};

    BaseObject.call(this, opts);

    this._bulletCapacity = meta.common.first_defined( opts._bulletCapacity, Number.MAX_VALUE );       // max count of bullets in charger
    this._bulletCount = meta.common.first_defined( opts.bulletCount, this._bulletCapacity );          // current count of bullets

    this._bulletConstructor = meta.common.first_defined( opts.bulletConstructor, Bullet );
}

meta.Class( Charger )
    
    .extend_from( BaseObject )

    .define_accessors([
        'bulletCount',
        'bulletConstructor'
    ])

    .define_accessors('bulletCapacity', {
        set: function (bulletCapacity) {
            this._bulletCount = this._bulletCapacity = bulletCapacity;
        }
    })

    .define_methods({
        isEmpty: function () {
            return this._bulletCount <= 0;
        },

        getNextBullet: function () {
            if (this.isEmpty()) {
                return null;
            }

            var nextBullet = new this._bulletConstructor();
            this._bulletCount--;
            return nextBullet;
        }
    })
;

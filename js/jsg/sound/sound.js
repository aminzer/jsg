function Sound(opts) {
    opts = opts || {};

    this._id = opts.id;
    this._src = opts.src;
}

new meta.Class( Sound )

    .define_accessors([
        'id',
        'src'
    ])

    .define_method('toCreatejsSound', function () {
        return {
            id: this._id,
            src: this._src
        };
    })
;

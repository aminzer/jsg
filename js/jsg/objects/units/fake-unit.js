function FakeUnit() { Unit.call(this) }

new meta.Class( FakeUnit )

    .extend_from( Unit )

    .define_static_method('instance', function () {
        FakeUnit._instance || (FakeUnit._instance = new FakeUnit());
        return FakeUnit._instance;
    })
;

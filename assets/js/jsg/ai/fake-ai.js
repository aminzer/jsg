function FakeAI() { }

new meta.Class( FakeAI )

    .define_methods({
        resolve: function () {
            // your code here
            // called every tick
        },

        _isControllable: function (unit) {
            return unit.objectType === OBJECT_TYPE.ENEMY;
        },

        _getTargets: function () {
            return _.players();
        }
    })
;

define(function (require, exports, module) {
    var meta         = require('meta'),
        MovingObject = require('objects/moving-object'),
        BULLET       = require('const/physics/bullet'),
        Painter      = require('util/painter');
    
    function Bullet(opts, render) {
        opts = opts || {};

        MovingObject.call(this, opts);

        this._damage = meta.common.first_defined( opts.damage, BULLET.DEFAULT.DAMAGE );
        this._lifetime = meta.common.first_defined( opts.lifetime, BULLET.DEFAULT.LIFETIME );

        this.speed = meta.common.first_defined( opts.speed, BULLET.DEFAULT.SPEED );
        this.angle = meta.common.first_defined( opts.angle, opts.movementAngle, 0);
        this.startMoving();

        if (render !== false) {
            this.render();
        }
    }

    new meta.Class( Bullet )

        .extend_from( MovingObject )

        .define_accessors([
            'damage',
            'lifetime'
        ])

        .define_writer('angle', function (angle) {
            this._angle = this._movementAngle = angle;
        })

        .define_writer('movementAngle', function (angle) {
            this._angle = this._movementAngle = angle;
        })

        .define_methods({
            render: function () {
                Painter.circle(this, 2, "#000");
            },

            die: function () {
                this.destroyShapes();
                gctx.bullets.remove(this.id);
                this.afterDie();
            },

            reduceLifetime: function () {
                return --this._lifetime;
            },

            afterDie: function () {
            }
        })

        .override_method({
            move: function () {
                Bullet.prototype.parent_move.call(this);
                return this.reduceLifetime() > 0;
            }
        })
    ;
    
    module.exports = Bullet;
});

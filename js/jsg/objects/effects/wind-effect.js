define(function (require, exports, module) {
    var meta         = require('meta'),
        M            = require('math-util'),
        CircleObject = require('objects/circle-object'),
        Effect       = require('objects/effects/effect'),
        Painter      = require('util/painter'),
        GameContext  = require('game-context');

    function WindEffect(opts, render) {
        opts = new meta.Hash( opts ).merge({
            radius: 100,
            intensity: 5
        }).to_obj();
    
        CircleObject.call(this, opts);
        Effect.call(this, opts);
    
        this._intensity = opts.intensity;
    
        if (render !== false) {
            this.render();
        }
    }
    
    new meta.Class( WindEffect )
    
        .extend_from( Effect )
    
        .add_mixin( CircleObject )
    
        .define_accessors([
            'intensity'
        ])
    
        .define_methods({
            render: function () {
                var rad = function (scale) { return this.radius * scale }.bind(this);
    
                Painter.shape(this, function (shape) {
                    shape.graphics
                        .beginFill('rgba(0,50,255,0.2)')
                        .drawCircle(0, 0, rad(1))
    
                        .beginFill('rgba(0, 50, 255, 0.1)')
                        .drawRect(-rad(1/3), -1, rad(7/6), 2)
                        .drawRect(rad(0.17), -rad(1/2), rad(1/2), 2)
                        .drawRect(rad(0.17), rad(1/2), rad(1/2), 2)
                        .drawRect(-rad(0.05), -rad(1/4), rad(5/6), 2)
                        .drawRect(-rad(0.05), rad(1/4), rad(5/6), 2)
                });
            },
    
            makeInfluence: function () {
                GameContext.instance.bullets.each(function (bullet) {
                    if (!this.isPointInside(bullet.x, bullet.y)) return;

                    if (Math.abs( M.normalizeAngle(bullet.angle - this.angle) ) < this.intensity) {
                        bullet.angle = this.angle;
                    } else {
                        if (M.isClockwiseDirection(bullet.angle, this.angle)) {
                            bullet.angle += this.intensity;
                        } else {
                            bullet.angle -= this.intensity;
                        }
                    }
                }, this);
            }
        })
    ;

    module.exports = WindEffect;
});

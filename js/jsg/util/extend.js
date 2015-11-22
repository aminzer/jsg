/**
 * Created by Minzer_AS on 01.10.2015.
 *
 * Extend(ChildClass).from(ParentClass);
 * Extend(ChildClass).from(ParentClass).withMixins([Mixin1, Mixin2]);
 *
 * # Parent constructors must be called manually from child constructor
 * # Mixin constructors must be first (parent fields are more important)
 * # Mixin methods override parent methods
 */

function Extend(childClass) {
    return {
        from: function(parentClass) {
            childClass.prototype = Object.create(parentClass.prototype);
            childClass.prototype._parentPrototype = parentClass.prototype;
            return {
                withMixins: function(mixins) {
                    if (mixins instanceof Array === false) {
                        mixins = [mixins];
                    }
                    mixins.forEach(function(mixin) {
                        for (var method in mixin.prototype) {
                            if (mixin.prototype.hasOwnProperty(method)) {
                                childClass.prototype[method] = mixin.prototype[method];
                            }
                        }
                    });
                }
            }
        }
    };
}

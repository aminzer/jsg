define(['qunit'], function (QUnit) {
    function Case(arguments) {
        var args = Array.prototype.slice.call(arguments);
        this._callback = args.pop();
        this._scopePath = args;
    }

    Case.prototype.getCallback = function () { return this._callback };
    Case.prototype.getScopeString = function () { return this._scopePath.join(' > ') };
    Case.prototype.hasScope = function () { return this._scopePath.length > 0 };

    function Test(name) {
        this._name = name;
        this._cases = [];
    }

    Test.prototype.addCase = function (/* args.. */) {
        this._cases.push(new Case(arguments));
    };
    
    Test.prototype.register = function () {
        this._cases.forEach(function (aCase) {
            QUnit.test( this._name + (aCase.hasScope() ? (' > ' + aCase.getScopeString()) : ''), aCase.getCallback());
        }, this);
    };
    
    return Test;
});

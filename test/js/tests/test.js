define(['qunit'], function (QUnit) {
    function Case(arguments) {
        var args = Array.prototype.slice.call(arguments);
        this._callback = args.pop();
        this._scope = args;
    }

    Case.prototype.getCallback = function () { return this._callback };
    Case.prototype.getScopeString = function () { return this._scope.join(' > ') };

    function Test(name) {
        this._name = name;
        this._cases = [];
    }

    Test.prototype.addCase = function (/* args.. */) {
        this._cases.push(new Case(arguments));
        console.log(this._cases[0].getScopeString())
    };
    
    Test.prototype.register = function () {
        this._cases.forEach(function (aCase) {
            QUnit.test( this._name + ' > ' + aCase.getScopeString(), aCase.getCallback());
        }, this);
    };
    
    return Test;
});

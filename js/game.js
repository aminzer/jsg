function Game(opts) {
    var self = {};

    var _stage = null;

    var _player = null;
    var _dynamicObjects = [];   // units etc
    var _bullets = [];          // harm elements (like bullets)
    var _ai = null;             // artificial intellect

    var pressedKeys = {};   // array with key codes of pressed buttons
    var cursorX = 0;
    var cursorY = 0;

    init();

    function init() {
        _stage = new createjs.Stage(opts.canvasId || "canvas");
        createjs.Ticker.setFPS(FPS);

        _player = Player({
            stage: _stage,
            dynamicObjects: _dynamicObjects,
            bullets: _bullets,
            x: 100,
            y: 100,
            hp: PLAYER_HP,
            speed: PLAYER_SPEED
        });
        _dynamicObjects.push(_player);

        for (var i = 0; i < 5; i++) {
            _dynamicObjects.push(Unit({
                stage: _stage,
                dynamicObjects: _dynamicObjects,
                bullets: _bullets,
                x: 800,
                y: 100 + i * 50
            }));
        }

        _ai = new AI({
            dynamicObjects: _dynamicObjects,
            target: _player
        });

        // set handlers
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("wheel", handleMouseWheel);
        createjs.Ticker.addEventListener("tick", handleTick);
    }

    // event handlers
    function handleTick(event) {

        // change physical parameters
        _player.aimAt(cursorX, cursorY);
        _ai.resolve();

        for (var i = 0; i < _dynamicObjects.length; i++) {
            if (_dynamicObjects[i].move() == false){     // lifeTime ended
                _dynamicObjects[i].destroyShapes();
                _dynamicObjects.splice(i, 1);
                i--;  // because of splice
            }
        }
        for (i = 0; i < _bullets.length; i++) {
            if (_bullets[i].move() == false){     // lifeTime ended
                destroyBullet(i);
                i--;  // because of splice
            }
        }

        handleTargetHits();

        // updating object's shapes on stage
        for (i = 0; i < _dynamicObjects.length; i++) {
            _dynamicObjects[i].updateShapes();
        }
        for (i = 0; i < _bullets.length; i++) {
            _bullets[i].updateShapes();
        }



        // redraw
        _stage.update();
    }

    function handleMouseMove(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    }

    function handleKeyDown(e) {
        pressedKeys[e.keyCode] = true;
        setPlayersDirection();

        if (e.keyCode === 17) {
            console.log("objects/bullets " + _dynamicObjects.length + "/" + _bullets.length);
        }

        if (e.keyCode === 79) {
            _player.getWeapon().fix();
        }
    }

    function handleKeyUp(e) {
        pressedKeys[e.keyCode] = false;
        setPlayersDirection();
    }

    function handleMouseDown(e) {
        _player.startShooting();
    }

    function handleMouseUp(e) {
        _player.stopShooting();
    }

    function handleMouseWheel(e) {
        var direction = e.deltaY > 0 ? 1 : -1;
        _player.changeWeapon(direction);

        return false;
    }

    function handleTargetHits() {
        for (var j = 0; j < _dynamicObjects.length; j++) {
            for (var i = 0; i < _bullets.length; i++) {
                if (MathUtility.isInCircle(
                    _dynamicObjects[j].getX(),
                    _dynamicObjects[j].getY(),
                    _dynamicObjects[j].getRadius(),
                    _bullets[i].getX(),
                    _bullets[i].getY()
                )) {
                    _dynamicObjects[j].takeDamage(_bullets[i].getDamage());     // unit takes damage
                    destroyBullet(i);
                    i--;  // because of splice
                }
            }

            if (_dynamicObjects[j].isAlive() == false) {        // unit is dead
                _dynamicObjects[j].destroyShapes();
                _dynamicObjects.splice(j, 1);
                j--;  // because of splice
            }
        }
    }

    // extra
    function setPlayersDirection() {
        var dx = 0,
            dy = 0;

        if (pressedKeys[RIGHT_BUTTON]) {
            dx++;
        }

        if (pressedKeys[LEFT_BUTTON]) {
            dx--;
        }

        if (pressedKeys[DOWN_BUTTON]) {
            dy++;
        }

        if (pressedKeys[UP_BUTTON]) {
            dy--;
        }

        if (dx == 0 && dy == 0) {
            _player.stopMoving();
            return;
        }

        var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
        if (dy < 0) {
            angle = -angle;
        }

        _player.startMoving(angle);
    }

    function destroyBullet(index) {
        _bullets[index].destroy();          // last action
        _bullets[index].destroyShapes();    // erase from stage
        _bullets.splice(index, 1);          // delete from _bullets array
    }

    return self;
}

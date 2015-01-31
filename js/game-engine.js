function GameEngine() {
    var self = {};

    var _stage = null;

    var _player = null;
    var _units = [];            // units and player
    var _bullets = [];          // harm elements (like bullets)
    var _effects = [];          // different physical effects

    var _ai = null;             // artificial intellect
    var _levelResolver = null;

    var pressedKeys = {};   // array with key codes of pressed buttons
    var cursorX = 0;
    var cursorY = 0;

    var _cursor = null;

    self.start = function() {
        _stage = new createjs.Stage("canvas");
        createjs.Ticker.setFPS(FPS);

        _cursor = Cursor({
            stage: _stage
        });

        _player = Player({
            stage: _stage,
            bullets: _bullets,
            x: 100,
            y: 100,
            hp: PLAYER_HP,
            speed: PLAYER_SPEED
        });
        _units.push(_player);

        _levelResolver = LevelResolver({
            stage: _stage,
            units: _units,
            bullets: _bullets
        });

       // _levelResolver.resolve(TEST_LEVEL());

        _ai = new AI({
            units: _units,
            target: _player
        });

        var tempEffect = BulletReflectEffect({
            stage: _stage,
            bullets: _bullets,
            x: 400,
            y: 150,
            on: true
        });
        _effects.push(tempEffect);

        // set handlers
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("wheel", handleMouseWheel);
        createjs.Ticker.addEventListener("tick", handleTick);
    };

    // event handlers
    function handleTick(event) {

        // 1. check if ticker isn't paused
        if (createjs.Ticker.paused == true) {
            return;
        }

        // 2. controlling objects (player and AI)
        _player.aimAt(_cursor.getX(), _cursor.getY());
        _ai.resolve();

        // 3. recounting logical parameters of Game Model Objects (uncontrolled)
        for (var i = 0; i < _units.length; i++) {
            if (_units[i].move() == false) {     // lifeTime ended
                _units[i].destroyShapes();
                _units.splice(i, 1);
                i--;  // because of splice
            }
        }
        for (i = 0; i < _bullets.length; i++) {
            if (_bullets[i].move() == false){     // lifeTime ended
                destroyBullet(i);
                i--;  // because of splice
            }
        }
        for (i = 0; i < _effects.length; i++) {
            _effects[i].makeInfluence();
        }

        handleTargetHits();

        // 4. updating shapes related to Game Model Objects
        for (i = 0; i < _units.length; i++) {
            _units[i].updateShapes();
        }
        for (i = 0; i < _bullets.length; i++) {
            _bullets[i].updateShapes();
        }
        for (i = 0; i < _effects.length; i++) {
            _effects[i].updateShapes();
        }
        _cursor.updateShapes();
        console.log(_cursor.getX());

        // 5. updating stage (redraw)
        _stage.update();
    }

    function handleKeyDown(e) {
        pressedKeys[e.keyCode] = true;
        setPlayersDirection();

        if (e.keyCode === LOG_BUTTON) {
            console.log("objects/bullets " + _units.length + "/" + _bullets.length);
        }

        if (e.keyCode === FIX_WEAPON_BUTTON) {
            _player.getWeapon().fix();
        }

        if (e.keyCode === PAUSE_BUTTON) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _levelResolver.toggleGenerating();
        }

        if (e.keyCode === 16) {
            handleMouseDown();
        }
    }

    function handleKeyUp(e) {
        pressedKeys[e.keyCode] = false;
        setPlayersDirection();

        if (e.keyCode === 16) {
            handleMouseUp();
        }
    }

    function handleMouseMove(e) {
        _cursor.setX(e.clientX);
        _cursor.setY(e.clientY);
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
        for (var j = 0; j < _units.length; j++) {
            for (var i = 0; i < _bullets.length; i++) {
                if (MathUtility.isInCircle(
                    _bullets[i].getX(),
                    _bullets[i].getY(),
                    _units[j].getX(),
                    _units[j].getY(),
                    _units[j].getRadius()
                )) {
                    _units[j].takeDamage(_bullets[i].getDamage());     // unit takes damage
                    destroyBullet(i);
                    i--;  // because of splice
                }
            }

            if (_units[j].isAlive() == false) {        // unit is dead
                _units[j].destroyShapes();
                _units.splice(j, 1);
                j--;  // because of splice
            }
        }
    }

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

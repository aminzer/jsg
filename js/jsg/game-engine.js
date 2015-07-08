function GameEngine(opts) {
    var self = {};

    var _gameState = {
        running: true
    };

    var _canvas = document.getElementById("canvas");

    var _stage = new createjs.Stage("canvas");

    var _player = null;
    var _units = [];            // units and player
    var _bullets = [];          // harm elements (like bullets)
    var _effects = [];          // different physical effects

    var _ai = null;             // artificial intellect
    var _levelResolver = null;

    var _pressedKeys = {};   // array with key codes of pressed buttons

    var _cursor = null;

    init();

    function init() {
        createjs.Ticker.setFPS(FPS);

        _cursor = Cursor({
            stage: _stage
        });

        _player = Player({
            stage: _stage,
            bullets: _bullets,
            x: 100,
            y: 100
        });
        _units.push(_player);

        _levelResolver = LevelResolver({
            stage: _stage,
            units: _units,
            effects: _effects,
            bullets: _bullets
        });

       // _levelResolver.resolve(TEST_LEVEL());
        _levelResolver.resolve(SIMPLE_LEVEL());

        _ai = new AI({
            units: _units,
            target: _player
        });

        // set handlers
        _canvas.addEventListener("mousemove", handleMouseMove);
        _canvas.addEventListener("mousedown", handleMouseDown);
        _canvas.addEventListener("mouseup", handleMouseUp);
        _canvas.addEventListener("wheel", handleMouseWheel);
        _canvas.oncontextmenu = handleRightButtonClick;
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        $(document).bind("player_dead", handlePlayersDeath);
    }

    self.start = function() {
        createjs.Ticker.addEventListener("tick", handleTick);
    };

    self.pause = function() {
        createjs.Ticker.paused = !createjs.Ticker.paused;
        _levelResolver.stopGenerating();
    };

    self.resume = function() {
        createjs.Ticker.paused = !createjs.Ticker.paused;
        _levelResolver.startGenerating();
    };

    // event handlers
    function handleTick(event) {

        // 1. check if ticker isn't paused
        if (createjs.Ticker.paused == true) {
            return;
        }

        // 2. controlling objects (player and AI)
        _player.aimAt(_cursor.x, _cursor.y);
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

        // 5. updating stage (redraw)
        _stage.update();
    }

    function handleKeyDown(e) {
        _pressedKeys[e.keyCode] = true;
        setPlayersDirection();

        if (e.keyCode === CONTROLS.LOG) {
            console.log("objects/bullets " + _units.length + "/" + _bullets.length);
        }

        if (e.keyCode === CONTROLS.FIX_WEAPON) {
            _player._weapon.fix();
        }

        if (e.keyCode === CONTROLS.PAUSE) {
            if (_gameState.running) {
                pauseGame();
            } else {
                resumeGame();
            }
        }

        if (e.keyCode >= 49 && e.keyCode <= 57) {
            _player.setWeapon(e.keyCode - 49);
        }

        if (e.keyCode === 16) {
            handleMouseDown();
        }
    }

    function handleKeyUp(e) {
        _pressedKeys[e.keyCode] = false;
        setPlayersDirection();
    }

    function handleMouseMove(e) {
        _cursor.x = e.clientX - _canvas.offsetLeft;
        _cursor.y = e.clientY - _canvas.offsetTop;
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

    function handleRightButtonClick(e) {
        return false;
    }

    function handleTargetHits() {
        for (var j = 0; j < _units.length; j++) {
            for (var i = 0; i < _bullets.length; i++) {
                if (_units[j].isPointInside(_bullets[i].x, _bullets[i].y)) {
                    _units[j].takeDamage(_bullets[i]._damage);     // unit takes damage
                    destroyBullet(i);
                    i--;  // because of splice
                    if (_units[j] === _player) {
                        $(document).trigger('player_hp_change', [_player._hp, _player._maxHp]);
                    }
                }
            }

            if (_units[j].isAlive() === false) {        // unit is dead
                if (_units[j].getObjectType() & UNIT_TYPE.ENEMY) {
                    $(document).trigger("enemy_died");
                } else if (_units[j].getObjectType() & UNIT_TYPE.PLAYER) {
                    $(document).trigger("player_dead");
                }
                _units[j].destroyShapes();
                _units.splice(j, 1);
                j--;  // because of splice
            }
        }
    }

    function handlePlayersDeath(e) {
        alert("it's over");
        location.reload();
    }

    function setPlayersDirection() {
        var dx = 0,
            dy = 0;

        if (_pressedKeys[CONTROLS.MOVE.RIGHT]) {
            dx++;
        }
        if (_pressedKeys[CONTROLS.MOVE.LEFT]) {
            dx--;
        }
        if (_pressedKeys[CONTROLS.MOVE.DOWN]) {
            dy++;
        }
        if (_pressedKeys[CONTROLS.MOVE.UP]) {
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

    function pauseGame() {
        if (_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _levelResolver.stopGenerating();
            _gameState.running = false;
        }
    }

    function resumeGame() {
        if (!_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _levelResolver.startGenerating();
            _gameState.running = true;
        }
    }

    return self;
}

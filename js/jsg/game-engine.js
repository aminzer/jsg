function GameEngine(opts) {
    var self = {};

    var _gameState = {
        running: true
    };

    var _ai = null;             // artificial intellect
    var _pressedKeys = {};   // array with key codes of pressed buttons
    var _cursor = null;

    init();

    function init() {
        createjs.Ticker.setFPS(FPS);

        _cursor = new Cursor();

        // set handlers
        _.stage().addEventListener("stagemousemove", handleMouseMove);
        _.stage().addEventListener("stagemousedown", handleMouseDown);
        _.stage().addEventListener("stagemouseup", handleMouseUp);
        _.canvas().addEventListener("wheel", handleMouseWheel);
        _.canvas().oncontextmenu = handleRightButtonClick;
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        $(document).bind("player_dead", handlePlayersDeath);
    }

    self.chooseLevel = function(levelName) {
        LevelResolver.resolve( LevelStorage.get(levelName) );
    };

    self.start = function() {
        createjs.Ticker.addEventListener("tick", handleTick);
        _ai = new AI();
    };

    self.pause = function() {
        pauseGame();
    };

    self.resume = function() {
        resumeGame();
    };

    // event handlers
    function handleTick(event) {

        // 1. check if ticker isn't paused
        if (createjs.Ticker.paused == true) {
            return;
        }

        // 2. controlling objects (player and AI)
        _.player().aimAt(_cursor.getX(), _cursor.getY());
        _ai.resolve();


        // 3. recounting logical parameters of Game Model Objects (uncontrolled)
        for (var i = 0; i < _.units().length; i++) {
            if (_.units()[i].move() == false) {     // lifeTime ended
                _.units()[i].destroyShapes();
                _.units().splice(i, 1);
                i--;  // because of splice
            }
        }
        for (i = 0; i < _.bullets().length; i++) {
            if (_.bullets()[i].move() == false){     // lifeTime ended
                destroyBullet(i);
                i--;  // because of splice
            }
        }
        for (i = 0; i < _.effects().length; i++) {
            _.effects()[i].makeInfluence();
        }

        handleTargetHits();

        // 4. updating shapes related to Game Model Objects
        for (i = 0; i < _.units().length; i++) {
            _.units()[i].updateShapes();
        }
        for (i = 0; i < _.bullets().length; i++) {
            _.bullets()[i].updateShapes();
        }
        for (i = 0; i < _.effects().length; i++) {
            _.effects()[i].updateShapes();
        }

        // 5. updating stage (redraw)
        _.stage().update();
    }

    function handleKeyDown(e) {
        _pressedKeys[e.keyCode] = true;
        setPlayersDirection();

        if (e.keyCode === CONTROLS.LOG) {
            console.log("objects/bullets " + _.units().length + "/" + _.bullets().length);
        }

        if (e.keyCode === CONTROLS.FIX_WEAPON) {
            _.player()._weapon.fix();
        }

        if (e.keyCode === CONTROLS.PAUSE) {
            if (_gameState.running) {
                pauseGame();
            } else {
                resumeGame();
            }
        }

        if (e.keyCode >= KEY.NUM_1 && e.keyCode <= KEY.NUM_9) {
            _.player().chooseWeapon(e.keyCode - KEY.NUM_1);
        }
    }

    function handleKeyUp(e) {
        _pressedKeys[e.keyCode] = false;
        setPlayersDirection();
    }

    function handleMouseMove(e) {
        _cursor.setX( Scale.getVirtual(e.stageX) );
        _cursor.setY( Scale.getVirtual(e.stageY) );
    }

    function handleMouseDown() {
        _.player().startShooting();
    }

    function handleMouseUp() {
        _.player().stopShooting();
    }

    function handleMouseWheel(e) {
        if (e.deltaY > 0) {
            _.player().chooseNextWeapon();
        } else {
            _.player().choosePrevWeapon();
        }
        return false;
    }

    function handleRightButtonClick(e) {
        return false;
    }

    function handleTargetHits() {
        for (var j = 0; j < _.units().length; j++) {
            for (var i = 0; i < _.bullets().length; i++) {
                if (_.units()[j].isPointInside(_.bullets()[i].getX(), _.bullets()[i].getY())) {
                    _.units()[j].takeDamage(_.bullets()[i].getDamage());     // unit takes damage
                    destroyBullet(i);
                    i--;  // because of splice
                    if (_.units()[j] === _.player()) {
                        $(document).trigger('player_hp_change', [_.player().getHp(), _.player().getMaxHp()]);
                    }
                }
            }

            if (_.units()[j].isAlive() === false) {        // unit is dead
                if (_.units()[j].getObjectType() == OBJECT_TYPE.ENEMY) {
                    $(document).trigger("enemy_died");
                } else if (_.units()[j].getObjectType() == OBJECT_TYPE.PLAYER) {
                    $(document).trigger("player_dead");
                }
                _.units()[j].destroyShapes();
                _.units().splice(j, 1);
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
            _.player().stopMoving();
            return;
        }

        var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
        if (dy < 0) {
            angle = -angle;
        }

        _.player().startMoving(angle);
    }

    function destroyBullet(index) {
        _.bullets()[index].die();          // last action
        _.bullets()[index].destroyShapes();    // erase from stage
        _.bullets().splice(index, 1);          // delete from _.bullets() array
    }

    function pauseGame() {
        if (_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _.enemyFactory() || _.enemyFactory().stopGenerating();
            _gameState.running = false;
        }
    }

    function resumeGame() {
        if (!_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _.enemyFactory() || _.enemyFactory().startGenerating();
            _gameState.running = true;
        }
    }

    return self;
}

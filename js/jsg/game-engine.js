function GameEngine(opts) {
    var self = {};

    var _gameState = {
        running: true
    };

    var _ai = null;
    var _control = null;

    init();

    function init() {
        createjs.Ticker.setFPS(FPS);

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
        _control = new DefaultControl();
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
        _control.handleRender();
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
        _control.handleKeyDown(e.keyCode);
        handleCommonKeys(e.keyCode);
    }

    function handleCommonKeys(keyCode) {
        if (keyCode === CONTROLS.COMMON.LOG) {
            console.log(_);
        }

        if (keyCode === CONTROLS.COMMON.PAUSE) {
            if (_gameState.running) {
                pauseGame();
            } else {
                resumeGame();
            }
        }
    }

    function handleKeyUp(e) {
        _control.handleKeyUp(e.keyCode);
    }

    function handleMouseMove(e) {
        _control.handleMouseMove(
            Scale.getVirtual(e.stageX),
            Scale.getVirtual(e.stageY)
        );
    }

    function handleMouseDown() {
        _control.handleMouseDown();
    }

    function handleMouseUp() {
        _control.handleMouseUp();
    }

    function handleMouseWheel(e) {
        _control.handleMouseWheel(e.deltaY);
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
            _.enemyFactory() && _.enemyFactory().stopGenerating();
            _gameState.running = false;
        }
    }

    function resumeGame() {
        if (!_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            _.enemyFactory() && _.enemyFactory().startGenerating();
            _gameState.running = true;
        }
    }

    return self;
}

function Game(opts) {
    var self = {};

    var _gameState = {
        running: true
    };

    var _ai = null;
    var _control = null;

    init();

    function init() {
        createjs.Ticker.framerate = Config.FPS;
        initHandlers();
        initSound();
    }

    self.chooseLevel = function(opts) {
        LevelResolver.resolve({
            level: LevelStorage.get(opts.level || 1),
            playersCount: opts.playersCount || 1
        });
        initControls();
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

    function initHandlers() {
        _.stage().addEventListener("stagemousemove", handleMouseMove);
        _.stage().addEventListener("stagemousedown", handleMouseDown);
        _.stage().addEventListener("stagemouseup", handleMouseUp);
        _.canvas().addEventListener("wheel", handleMouseWheel);
        _.canvas().oncontextmenu = handleRightButtonClick;
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        $(document).bind("player_dead", handlePlayersDeath);
    }

    function initSound() {
        if (Config.sound.on) {
            SoundStorage.registerSoundBank();
        }
    }

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
        _.effects().forEach(function (effect) {
            if (effect.isActive()) {
                effect.makeInfluence()
            }
        });

        handleTargetHits();

        // 4. updating shapes related to Game Model Objects
        _.units().forEach(function (unit) { unit.updateShapes() });
        _.bullets().forEach(function (bullet) { bullet.updateShapes() });
        _.effects().forEach(function (effect) { effect.updateShapes() });

        // 5. trigger player events
        _.players().forEach(function(player) {
            $(document).trigger('player_hp_change', [player.id, player.hp, player.maxHp]);
        });

        // 6. updating stage (redraw)
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
            Canvas.Scale.convertToVirtual(e.stageX),
            Canvas.Scale.convertToVirtual(e.stageY)
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
        // TODO check standard method     easel.js : Shape.hitTest(x,y)

        for (var i = 0; i < _.units().length; i++) {
            var unit = _.units()[i];
            for (var j = 0; j < _.bullets().length; j++) {
                var bullet = _.bullets()[j];
                if (unit.isPointInside(bullet.x, bullet.y)) {
                    unit.takeDamage(bullet.damage);     // unit takes damage
                    destroyBullet(j);
                    j--;  // because of splice
                }
            }

            if (unit.isAlive() === false) {        // unit is dead
                if (unit.objectType == OBJECT_TYPE.ENEMY) {
                    $(document).trigger("enemy_died");
                } else if (unit.objectType == OBJECT_TYPE.PLAYER) {
                    $(document).trigger("player_dead");
                }
                unit.destroyShapes();
                _.units().splice(i, 1);
                i--;  // because of splice
            }
        }
    }

    function handlePlayersDeath(e) {
        alert("it's over");
        location.reload();
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

    function initControls() {
        switch (_.players().length) {
            case 1:
                _control = new UniversalControl({
                    keyMap: CONTROLS.DEFAULT,
                    controlledObject: _.players()[0]
                });
                break;
            case 2:
                _control = new MultiController({
                    controls: [
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER1,
                            controlledObject: _.players()[0],
                            cursor: new Cursor({
                                color: "rgba(0,100,0,0.2)"
                            })
                        }),
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER2,
                            controlledObject: _.players()[1],
                            color: "rgba(0,0,255,0.1)"
                        })
                    ]
                });
                break;
            default:
                _control = new ControlInterface();
        }
    }

    return self;
}

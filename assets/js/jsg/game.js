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

    self.chooseLevel = function (opts) {
        LevelResolver.resolve({
            levelDefinition: LevelStorage.get(opts.levelId || 1),
            playerCount: opts.playerCount || 1
        });
        initControls();
    };

    self.start = function () {
        createjs.Ticker.addEventListener("tick", handleTick);
        _ai = new DefaultAI();
    };

    self.pause = function () {
        pauseGame();
    };

    self.resume = function () {
        resumeGame();
    };

    function initHandlers() {
        gctx.stage.addEventListener("stagemousemove", handleMouseMove);
        gctx.stage.addEventListener("stagemousedown", handleMouseDown);
        gctx.stage.addEventListener("stagemouseup", handleMouseUp);
        Canvas.htmlElement.addEventListener("wheel", handleMouseWheel);
        Canvas.htmlElement.oncontextmenu = handleRightButtonClick;
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        $(document).bind("player_death", handlePlayersDeath);
    }

    function initSound() {
        if (Config.sound.on) {
            SoundManager.registerSoundBank();
            SoundManager.enableSound();
        }
    }

    function handleTick() {

        // 1. check if ticker isn't paused
        if (createjs.Ticker.paused == true) {
            return;
        }

        // 2. controlling objects (player and AI)
        _control.handleRender();
        _ai.resolve();

        // 3. recounting logical parameters of Game Model Objects (uncontrolled)
        gctx.units.forEach(function (unit, i) {
            if (unit.move() == false) {
                destroyUnit(i);
            }
        });
        gctx.bullets.forEach(function (bullet, i) {
            if (bullet.move() == false) {
                destroyBullet(i);
            }
        });
        gctx.effects.forEach(function (effect) {
            if (effect.isActive()) {
                effect.makeInfluence()
            }
        });

        handleTargetHits();

        // 4. updating shapes related to Game Model Objects
        gctx.units.forEach(function (unit) { unit.updateShapes() });
        gctx.bullets.forEach(function (bullet) { bullet.updateShapes() });
        gctx.effects.forEach(function (effect) { effect.updateShapes() });

        // 5. trigger player events
        gctx.players.forEach(function (player) {
            $(document).trigger('player_hp_change', [player.id, player.hp, player.maxHp]);
        });

        // 6. updating stage (redraw)
        gctx.stage.update();
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

    function handleRightButtonClick() {
        return false;
    }

    function handleTargetHits() {                      // TODO check standard method     easel.js : Shape.hitTest(x,y)
        gctx.units.forEach(function (unit, unitIndex) {
            gctx.bullets.forEach(function (bullet, bulletIndex) {
                if (unit.isPointInside(bullet.x, bullet.y)) {
                    unit.takeDamage(bullet.damage);
                    destroyBullet(bulletIndex);
                }
            });

            if (unit.isDead()) {
                if (unit.objectType == OBJECT_TYPE.PLAYER) {
                    $(document).trigger("player_death");
                }
                destroyUnit(unitIndex);
            }
        });
    }

    function handlePlayersDeath(e) {
        alert("it's over");
        location.reload();
    }

    function destroyBullet(index) {
        var bullet = gctx.bullets[index];
        bullet.die();
        bullet.destroyShapes();
        gctx.bullets.splice(index, 1);
    }

    function destroyUnit(index) {
        gctx.units[index].destroyShapes();
        gctx.units.splice(index, 1);
    }

    function pauseGame() {
        if (_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            gctx.enemyFactory && gctx.enemyFactory.stopGenerating();
            _gameState.running = false;
        }
    }

    function resumeGame() {
        if (!_gameState.running) {
            createjs.Ticker.paused = !createjs.Ticker.paused;
            gctx.enemyFactory && gctx.enemyFactory.startGenerating();
            _gameState.running = true;
        }
    }

    function initControls() {
        switch (gctx.players.length) {
            case 1:
                _control = new UniversalControl({
                    keyMap: CONTROLS.DEFAULT,
                    controlledObject: gctx.players[0]
                });
                break;
            case 2:
                _control = new MultiController({
                    controls: [
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER1,
                            controlledObject: gctx.players[0],
                            cursor: new Cursor({
                                color: "rgba(0,100,0,0.2)"
                            })
                        }),
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER2,
                            controlledObject: gctx.players[1],
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

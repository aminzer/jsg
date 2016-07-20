var Game = function () {
    var self = {};

    var _isRunning = false;

    var _ai = null;
    var _control = null;

    self.initialize = function () {
        createjs.Ticker.framerate = Config.FPS;
        initHandlers();
        initSound();
        return self;
    };

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
        _isRunning = true;
    };

    self.pause = function () {
        if (!_isRunning) return;

        createjs.Ticker.paused = !createjs.Ticker.paused;
        gctx.enemyFactory && gctx.enemyFactory.stopGenerating();
        _isRunning = false;
    };

    self.resume = function () {
        if (_isRunning) return;

        createjs.Ticker.paused = !createjs.Ticker.paused;
        gctx.enemyFactory && gctx.enemyFactory.startGenerating();
        _isRunning = true;
    };

    self.isPaused = function () {
        return !_isRunning;
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
        if (!Config.sound.on) return;

        SoundManager.registerSoundBank();
        SoundManager.enableSound();
    }

    function handleTick() {

        // 1. check if ticker isn't paused
        if (createjs.Ticker.paused) return;

        // 2. controlling objects (player and AI)
        _control.handleRender();
        _ai.resolve();

        // 3. recounting logical parameters of Game Model Objects (physics impact, uncontrolled)
        gctx.units.each(function (unit) { !unit.move() && unit.die() });
        gctx.bullets.each(function (bullet) { !bullet.move() && bullet.die() });
        gctx.effects.each(function (effect) { effect.isActive() && effect.makeInfluence() });

        handleTargetHits();

        // 4. updating shapes related to Game Model Objects
        gctx.units.each(function (unit) { unit.updateShapes() });
        gctx.bullets.each(function (bullet) { bullet.updateShapes() });
        gctx.effects.each(function (effect) { effect.updateShapes() });

        // 5. trigger player events
        gctx.players.each(function (player) {
            $(document).trigger('player_hp_change', [player.id, player.hp, player.maxHp]);
        });

        // 6. updating stage (redraw)
        gctx.stage.update();
    }

    function handleKeyDown(e) {
        _control.handleKeyDown(e.keyCode);
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

    function handleMouseDown(e) {
        _control.handleMouseDown(
            Canvas.Scale.convertToVirtual(e.stageX),
            Canvas.Scale.convertToVirtual(e.stageY)
        );
    }

    function handleMouseUp(e) {
        _control.handleMouseUp(
            Canvas.Scale.convertToVirtual(e.stageX),
            Canvas.Scale.convertToVirtual(e.stageY)
        );
    }

    function handleMouseWheel(e) {
        _control.handleMouseWheel(e.deltaY);
        return false;
    }

    function handleRightButtonClick() {
        return false;
    }

    function handleTargetHits() {                      // TODO check standard method     easel.js : Shape.hitTest(x,y)
        gctx.units.each(function (unit) {
            gctx.bullets.each(function (bullet) {
                if (unit.isPointInside(bullet.x, bullet.y)) {
                    unit.takeDamage(bullet.damage);
                    bullet.die();
                }
            });

            if (unit.isDead()) {
                unit.die();
                if (unit.objectType == OBJECT_TYPE.PLAYER) {
                    $(document).trigger("player_death", [unit.id]);
                }
            }
        });
    }

    function handlePlayersDeath(e) {
        if (gctx.players.size() == 0) {
            alert("it's over");
            location.reload();
        }
    }

    function initControls() {
        switch (gctx.players.size()) {
            case 1:
                _control = new UniversalControl({
                    keyMap: CONTROLS.DEFAULT,
                    controlledObject: gctx.players.to_arr()[0]
                });
                break;
            case 2:
                _control = new MultiController({
                    controls: [
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER1,
                            controlledObject: gctx.players.to_arr()[0],
                            cursor: new Cursor({
                                color: "rgba(0,100,0,0.2)"
                            })
                        }),
                        new UniversalControl({
                            keyMap: CONTROLS.PLAYER2,
                            controlledObject: gctx.players.to_arr()[1],
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
}();

define(function (require, exports, module) {
    var $                = require('jquery'),
        createjs         = require('createjs'),
        Canvas           = require('widgets/canvas'),
        DefaultAI        = require('ai/default-ai'),
        Config           = require('config/config'),
        CONTROLS         = require('config/controls'),
        OBJECT_TYPE      = require('const/object-type'),
        ControlInterface = require('control/control-interface'),
        Cursor           = require('control/cursor'),
        UniversalControl = require('control/universal-control'),
        MultiControl     = require('control/multi-control'),
        LevelResolver    = require('levels/level-resolver'),
        LevelStorage     = require('levels/level-storage'),
        SoundManager     = require('sound/sound-manager'),
        GameContext      = require('game-context');

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
            GameContext.instance().enemyFactory && GameContext.instance().enemyFactory.stopGenerating();
            _isRunning = false;
        };
    
        self.resume = function () {
            if (_isRunning) return;
    
            createjs.Ticker.paused = !createjs.Ticker.paused;
            GameContext.instance().enemyFactory && GameContext.instance().enemyFactory.startGenerating();
            _isRunning = true;
        };
    
        self.isPaused = function () {
            return !_isRunning;
        };
    
        function initHandlers() {
            GameContext.instance().stage.addEventListener("stagemousemove", handleMouseMove);
            GameContext.instance().stage.addEventListener("stagemousedown", handleMouseDown);
            GameContext.instance().stage.addEventListener("stagemouseup", handleMouseUp);
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
            GameContext.instance().units.each(function (unit) { !unit.move() && unit.die() });
            GameContext.instance().bullets.each(function (bullet) { !bullet.move() && bullet.die() });
            GameContext.instance().effects.each(function (effect) { effect.isActive() && effect.makeInfluence() });
    
            handleTargetHits();
    
            // 4. updating shapes related to Game Model Objects
            GameContext.instance().units.each(function (unit) { unit.updateShapes() });
            GameContext.instance().bullets.each(function (bullet) { bullet.updateShapes() });
            GameContext.instance().effects.each(function (effect) { effect.updateShapes() });
    
            // 5. trigger player events
            GameContext.instance().players.each(function (player) {
                $(document).trigger('player_hp_change', [player.id, player.hp, player.maxHp]);
            });
    
            // 6. updating stage (redraw)
            GameContext.instance().stage.update();
        }
    
        function handleKeyDown(e) {
            _control.handleKeyDown(e.keyCode);
        }
    
        function handleKeyUp(e) {
            _control.handleKeyUp(e.keyCode);
        }
    
        function handleMouseMove(e) {
            _control.handleMouseMove(
                Canvas.Scale.toVirtual(e.stageX),
                Canvas.Scale.toVirtual(e.stageY)
            );
        }
    
        function handleMouseDown(e) {
            _control.handleMouseDown(
                Canvas.Scale.toVirtual(e.stageX),
                Canvas.Scale.toVirtual(e.stageY)
            );
        }
    
        function handleMouseUp(e) {
            _control.handleMouseUp(
                Canvas.Scale.toVirtual(e.stageX),
                Canvas.Scale.toVirtual(e.stageY)
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
            GameContext.instance().units.each(function (unit) {
                GameContext.instance().bullets.each(function (bullet) {
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
            if (GameContext.instance().players.size() == 0) {
                setTimeout(function () {
                    alert("it's over");
                    location.reload();
                }, 2000);
            }
        }
    
        function initControls() {
            switch (GameContext.instance().players.size()) {
                case 1:
                    _control = new UniversalControl();
                    break;
                case 2:
                    _control = new MultiControl({
                        controls: [
                            new UniversalControl({
                                keyMap: CONTROLS.PLAYER1,
                                controlledUnitId: GameContext.instance().players.get_by_index(0).id,
                                cursor: new Cursor({
                                    color: "rgba(0,100,0,0.2)"
                                })
                            }),
                            new UniversalControl({
                                keyMap: CONTROLS.PLAYER2,
                                controlledUnitId: GameContext.instance().players.get_by_index(1).id,
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

    module.exports = Game;
});

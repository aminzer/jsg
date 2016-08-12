require(['requirejs-config'], function () {
    require([
        'request',
        'widgets/player-panel-holder',
        'widgets/canvas',
        'levels/level-storage',
        'widgets/menu',
        'game-context',
        'game',
        'config/controls'
    ], function(
        Request,
        PlayerPanelHolder,
        Canvas,
        LevelStorage,
        Menu,
        GameContext,
        Game,
        CONTROLS
    ) {
        var levelId = Request.getParam('levelId', 1);
        var playerCount = Math.min(Request.getParam('playerCount', 1), 2);

        PlayerPanelHolder.initialize({
            playerCount: playerCount
        }).render({
            $parent: $(document.body)
        });

        Canvas.initialize({
            width: $(document.body).width(),
            height: $(document.body).height() - PlayerPanelHolder.getHeight()
        }).render({
            $parent: $(document.body)
        });

        LevelStorage.initialize();

        Menu.initialize().render();
        Menu.hide();

        GameContext.initialize();

        Game.initialize().chooseLevel({
            levelId: levelId,
            playerCount: playerCount
        });

        PlayerPanelHolder.bindToPlayers();

        document.addEventListener("keydown", function (e) {
            if (e.keyCode === CONTROLS.COMMON.MENU) {
                if (Game.isPaused()) {
                    Game.resume();
                    Menu.hide();
                } else {
                    Game.pause();
                    Menu.show();
                }
            }
        });

        Game.start();
    });
});

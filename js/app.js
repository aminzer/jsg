requirejs.config({
    baseUrl: 'js/jsg',

    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'createjs': {
            exports: 'createjs'
        },
        'meta': {
            exports: 'meta'
        }
    },

    paths: {
        'widgets': '../widgets',
        
        'jquery': '../../vendor/jquery-2.1.4.min',
        'createjs': '../../vendor/createjs.min',
        'meta': '../../lib/meta',
        'request': '../../lib/request',
        'random-access-array': '../../lib/random-access-array'
    }
});

require([
    'request',
    'widgets/player-panel-holder',
    'widgets/canvas',
    'widgets/menu',
    'game-context'
], function(
    Request,
    PlayerPanelHolder,
    Canvas,
    Menu,
    GameContext
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

    // LevelStorage.initialize();  // TODO-migration

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

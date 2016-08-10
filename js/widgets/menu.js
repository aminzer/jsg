define(function (require, exports, module) {
    var $       = require('jquery'),
        Request = require('request');

    var LevelStorage = LevelStorageStub = {  // TODO-migration: remove stub, require LevelStorage
        getAll: function () {
            return [];
        },
        get:function () {
            return {name: 'name'}
        }
    };
    
    var Menu = {};
    
    var $node = null;

    var _template =
        '<div id="game-menu">' +
        '  <div class="modal">' +
        '    <div class="title">Menu</div><hr>' +
        '    <label>Level' +
        '      <select id="level-id-select" class="select"></select>' +
        '    </label>' +
        '    <div id="level-description"></div>' +
        '    <br><br>' +
        '    <label>Player Count' +
        '      <select id="player-count-select" class="select"></select>' +
        '    </label>' +
        '    <br>' +
        '    <button id="start-button">Start</button>' +
        '  </div>' +
        '</div>';

    Object.defineProperties(Menu, {
        $node: {
            get: function () {
                if (!$node) render();
                return $node;
            }
        }
    });

    Menu.initialize = function () {
        return Menu;
    };

    Menu.render = render;

    Menu.show = function () {
        $node.css('display', '');
    };

    Menu.hide = function () {
        $node.css('display', 'none');
    };

    function render() {
        $(document.body).append($node = $(_template));

        var $levelSelect = $node.find('#level-id-select');
        for (var levelId in LevelStorage.getAll()) {
            $levelSelect.append($('<option value="' + levelId + '">' + LevelStorage.get(levelId).name + '</option>'));
        }
        $levelSelect.val(Request.getParam('levelId') || 1);
        updateLevelDescription();

        var $playerCountSelect = $node.find('#player-count-select');
        for (var playerCount = 1; playerCount <= 2; playerCount++) {
            $playerCountSelect.append('<option>' + playerCount + '</option>');
        }
        $playerCountSelect.val(Request.getParam('playerCount') || 1);

        initHandlers();

        return $node;
    }

    function initHandlers() {
        $('#level-id-select').change(updateLevelDescription);
        $('#start-button').click(function () {
            window.location.href = Request.getBasePath({
                levelId: getSelectedLevel().id,
                playerCount: getSelectedPlayerCount()
            })
        });
    }

    function updateLevelDescription() {
        var description = getSelectedLevel().description;
        if (description) {
            $node.find('#level-description').text(description).show(100);
        } else {
            $node.find('#level-description').hide(100);
        }
    }

    function getSelectedLevel() {
        return LevelStorage.get(+$('#level-id-select').find(":selected").val());
    }

    function getSelectedPlayerCount() {
        return +$('#player-count-select').find(":selected").val();
    }

    module.exports = Menu;
});

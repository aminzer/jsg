var SoundManager = function () {
    var JSON_FILE_PATH = 'assets/js/jsg/sound/sounds.json';
    var soundMap = {};

    return {
        registerSoundBank: function() {
            $.ajax({
                dataType: 'json',
                url: JSON_FILE_PATH,
                success: function (receivedJson) {
                    var sounds = [];
                    receivedJson.sounds.forEach(function (src) {
                        sounds.push(new Sound({
                            id: src.split('.')[0],
                            src: src
                        }));
                    });

                    createjs.Sound.registerSounds(sounds.map(function (sound) {
                        return sound.toCreatejsSound();
                    }), receivedJson.basePath);

                    sounds.forEach(function (sound) {
                        soundMap[sound.id] = sound;
                    })
                },
                error: function () {
                    console.error('Sound registry file wasn\'t found at ' + JSON_FILE_PATH);
                }
            });
        },

        getSound: function(soundId) {
            return soundMap[soundId];
        },

        hasSound: function (soundId) {
            return typeof soundMap[soundId] != 'undefined';
        },

        play: function(soundId) {
            if (Config.sound) {
                createjs.Sound.play(soundId);
            }
        }
    };
}();

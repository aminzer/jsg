var SoundManager = function () {
    var self = {};

    var SOUND_REGISTRY_FILE_PATH = 'assets/sounds/sound-registry.json';
    var _soundMap = null;
    var _soundOn = false;

    self.registerSoundBank = function () {
        $.ajax({
            dataType: 'json',
            url: SOUND_REGISTRY_FILE_PATH,
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

                _soundMap = {};
                sounds.forEach(function (sound) {
                    _soundMap[sound.id] = sound;
                });
            },
            error: function () {
                console.error('Sound registry file wasn\'t found at ' + SOUND_REGISTRY_FILE_PATH);
            }
        });
    };

    self.enableSound = function () {
        _soundOn = true;
    };

    self.disableSound = function () {
        _soundOn = false;
    };

    self.isSoundEnabled = function () {
        return _soundOn;
    };

    self.play = function (soundId) {
        if (_soundOn) {
            createjs.Sound.play(soundId);
        }
    };

    return self;
}();

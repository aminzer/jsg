var SoundStorage = function () {
    var audioPath = "sound/";
    var rawSounds = [
        'weapon/shot1.mp3',
        'weapon/shot2.mp3',
        'weapon/shot3.mp3'
    ];
    var sounds = [];

    return {

        registerSoundBank: function() {
            var soundsToRegister = [];
            var sound;
            rawSounds.forEach(function(src) {
                sound = new Sound({
                    id: src.split('.')[0],
                    src: src
                });
                sounds.push(sound);
                soundsToRegister.push({
                    id: sound.getId(),
                    src: sound.getSrc()
                });
            });
            createjs.Sound.registerSounds(soundsToRegister, audioPath);
        },

        getSounds: function() {
            return sounds;
        },

        getSound: function(soundId) {
            for (var i = 0; i < sounds.length; i++) {
                if (sounds[i].getId() == soundId) {
                    return sounds[i]
                }
            }
            return null;
        },

        // TODO move to player class
        play: function(soundId) {
            createjs.Sound.play(soundId);
        }
    };
}();

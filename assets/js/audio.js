(function () {
    'use strict';

    /***/
    var AudioPlayer = function () {
        this._player = new Audio();
        return this;
    };
    /***/


    /***/
    AudioPlayer.prototype.play = function (url) {
        var player = this._player;

        if (player.src == url) {
            if (player.paused) {
                player.play();

            } else {
                player.pause();
            }
        } else {
            player.src = url;
            player.play();
        }
        return this;
    };
    AudioPlayer.prototype.isStop = function(){
        var player = this._player;
        return player.paused;
    };
    /***/

    var player = new AudioPlayer();

    window.SnowRollAudioPlayer = function (url) {
        return player.play(url);
    };;
}());

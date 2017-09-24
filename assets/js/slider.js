(function () {
    'use strict';

    /***/
    var Slider = function (selector) {
        var $ = function (selector) {
            return document.querySelector(selector);
        };

        this._element = $(selector);
        this._min = 0;
        this._max = this._element.children.length - 1;

        return this;
    };
    /***/


    /***/
    Slider.prototype.move = function (toSlide) {
        if (toSlide > this._max) {
            this._slide = this._max;
        } else if (toSlide >= this._min) {
            this._element.style.left = toSlide * -100 + '%';
            this._slide = toSlide;
        } else {
            this._slide = this._min;
        }

        return this._slide;
    };
    /***/

    window.SnowRollImageSlider = function (selector) {
        return new Slider(selector);
    };;

}());

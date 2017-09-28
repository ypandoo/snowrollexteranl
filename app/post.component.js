"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
require('rxjs/add/operator/switchMap');
var ng2_meta_1 = require('ng2-meta');
var data_service_1 = require('./data.service');
var PostComponent = (function () {
    function PostComponent(dataService, route, location, metaService) {
        this.dataService = dataService;
        this.route = route;
        this.location = location;
        this.metaService = metaService;
        this.slide = -1;
        this.slideshow = window['SnowRollImageSlider'] || this.returnNull;
        this.audioPlayer = window['SnowRollAudioPlayer'] || this.returnNull;
        this.wave = window['SiriWave'] || this.returnNull;
        this.span_index = null;
        this.timer_id = null;
        this.image_index = 0;
        this.audio_player = null;
        this.play_wave = 0;
        this.waveEle = null;
    }
    PostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.getData(+params['id']); })
            .subscribe(function (post) { return _this.parseData(post); });
    };
    PostComponent.prototype.getData = function (id) {
        this.id = id;
        return this.dataService.getPostData(id);
    };
    PostComponent.prototype.parseData = function (data) {
        this.setMetaData(data);
        if (typeof (data.music) == 'object') {
            data.images = [data.music.photo];
            data.num_images = 1;
            data.image_url = data.music.photo;
            for (var i = 2; i <= data.num_images; i++) {
                data.images.push(data['image' + i + '_url']);
            }
            data.img_grid = 'img-grid-' + Math.min(data.num_images, 3);
            data.more_img_count = data.num_images - 3;
            data.audio = [{
                    url: data['music']['image_audio1'],
                    x: 0.4613,
                    y: 0.4613
                }];
        }
        else {
            data.images = [data.image_url];
            for (var i = 2; i <= data.num_images; i++) {
                data.images.push(data['image' + i + '_url']);
            }
            data.img_grid = 'img-grid-' + Math.min(data.num_images, 3);
            data.more_img_count = data.num_images - 3;
            data.audio = [];
            for (var i = 1; i <= 3; i++) {
                if (typeof data['audio' + i + '_x'] === 'number') {
                    data.audio.push({
                        url: data['audio' + i + '_url'],
                        x: data['audio' + i + '_x'],
                        y: data['audio' + i + '_y']
                    });
                }
            }
        }
        this.post = data;
    };
    PostComponent.prototype.setMetaData = function (post) {
        this.metaService.setTitle('SnowRoll Post by ' + post.username);
        if (typeof (post.music) == 'object') {
            this.metaService.setTag('og:image', post.music.photo);
        }
        else {
            this.metaService.setTag('og:image', post.image_url);
        }
        this.metaService.setTag('og:url', 'http://share.snowroll.me/posts/' + this.id);
    };
    PostComponent.prototype.playAudio = function (url) {
        this.audio_player = this.audioPlayer(url);
    };
    PostComponent.prototype.iconAnimate = function (index) {
        var that = this;
        var tindex = 0;
        clearInterval(this.timer_id);
        this.timer_id = setInterval(function () {
            if (that.audio_player.isStop()) {
                that.span_index = null;
                that.play_wave = 0;
                document.getElementById("animate-line").style.display = "none";
            }
            else {
                that.span_index = index;
                that.checkWave();
            }
            that.image_index = 3 - (tindex % 3);
            tindex++;
        }, 150);
    };
    PostComponent.prototype.checkWave = function () {
        if (!this.waveEle) {
            this.waveEle = new this.wave({
                amplitude: 1,
                container: document.getElementById('animate-line'),
                autostart: true,
                style: 'ios9'
            });
        }
        if (typeof (this.post.music) == 'object') {
            //this.play_wave = 1;
            document.getElementById("animate-line").style.display = "block";
        }
        else {
            //this.play_wave = 0;
            document.getElementById("animate-line").style.display = "none";
        }
    };
    PostComponent.prototype.getBackgrond = function (index) {
        var url = "url(assets/img/vanimation/voiceimg1.svg)";
        if (index == this.span_index)
            url = "url(assets/img/vanimation/voiceimg" + this.image_index + ".svg)";
        return url;
    };
    PostComponent.prototype.getOpacity = function (index) {
        var opacity = 1;
        if (index == this.span_index)
            opacity = 0.6;
        return opacity;
    };
    PostComponent.prototype.openSlideshow = function (slide) {
        if (this.post.post_type === 1) {
            this.slide = slide;
        }
    };
    PostComponent.prototype.moveSlideshow = function (toSlide) {
        this.slide = this.slideshow('.slider').move(toSlide);
    };
    PostComponent.prototype.closeSlideshow = function () {
        this.slide = -1;
    };
    PostComponent.prototype.returnNull = function (arg) {
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PostComponent.prototype, "id", void 0);
    PostComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'post',
            templateUrl: 'views/post.html'
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, common_1.Location, ng2_meta_1.MetaService])
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
//# sourceMappingURL=post.component.js.map
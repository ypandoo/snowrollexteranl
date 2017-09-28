import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { MetaService } from 'ng2-meta';

import { Post }        from './post-data';
import { DataService } from './data.service';

@Component({
    moduleId: module.id,
    selector: 'post',
    templateUrl: 'views/post.html'
})

export class PostComponent implements OnInit {
    @Input()
    id: number;
    post: Post;

    slide = -1;
    private slideshow: any = window['SnowRollImageSlider'] || this.returnNull;
    private audioPlayer: any = window['SnowRollAudioPlayer'] || this.returnNull;
    private wave: any = window['SiriWave'] || this.returnNull;
    private span_index: any = null;
    private timer_id: any = null;
    private image_index: any = 0;
    private audio_player: any = null;
    private play_wave: any = 0;
    private waveEle: any = null;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location,
        private metaService: MetaService,
    ) {}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.getData(+params['id']))
            .subscribe(post => this.parseData(post));

    }

    getData(id: number) : any {
        this.id = id;
        return this.dataService.getPostData(id);
    }

    parseData(data: any) : void {
        this.setMetaData(data);

        if( typeof(data.music) == 'object')
        {
            data.images = [data.music.photo];
            data.num_images = 1;
            data.image_url = data.music.photo;

            for (let i = 2; i <= data.num_images; i++) {
                data.images.push(data['image' + i + '_url']);
            }

            data.img_grid = 'img-grid-' + Math.min(data.num_images, 3);
            data.more_img_count = data.num_images - 3;

            data.audio = [{
                url: data['music']['image_audio1'],
                x: 0.4613,
                y: 0.4613
            }];

            // for (let i = 1; i <= 3; i++) {
            //     if (typeof data['audio' + i + '_x'] === 'number') {
            //         data.audio.push({
            //             url: data['audio' + i + '_url'],
            //             x: data['audio' + i + '_x'],
            //             y: data['audio' + i + '_y']
            //         });
            //     }
            // }
        }else{
            data.images = [data.image_url];

            for (let i = 2; i <= data.num_images; i++) {
                data.images.push(data['image' + i + '_url']);
            }

            data.img_grid = 'img-grid-' + Math.min(data.num_images, 3);
            data.more_img_count = data.num_images - 3;

            data.audio = [];

            for (let i = 1; i <= 3; i++) {
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
    }

    setMetaData(post: Post) : void {
        this.metaService.setTitle('SnowRoll Post by ' + post.username);
        if(typeof (post.music) == 'object')
        {
            this.metaService.setTag('og:image', post.music.photo);
        }else
        {
            this.metaService.setTag('og:image', post.image_url);
        }
        this.metaService.setTag('og:url', 'http://share.snowroll.me/posts/' + this.id);
    }

    playAudio(url: string) : void {
        this.audio_player = this.audioPlayer(url);
    }

    iconAnimate(index: number) :void{
        var that = this;
        var tindex = 0;
        clearInterval(this.timer_id);
        this.timer_id = setInterval(function(){
            if(that.audio_player.isStop())
            {
                that.span_index = null;
                that.play_wave = 0;
                document.getElementById("animate-line").style.display = "none";
            }    
            else
            {
                that.span_index = index;
                that.checkWave();
            }    
            that.image_index = 3 - (tindex % 3);
            tindex ++;
        },150);
    }

    checkWave(): void {
        if(!this.waveEle)
        {
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
        } else {
            //this.play_wave = 0;
            document.getElementById("animate-line").style.display = "none";
        }
    }

    getBackgrond(index: number) : any {
        var url = "url(assets/img/vanimation/voiceimg1.svg)";
        if(index == this.span_index)
            url = "url(assets/img/vanimation/voiceimg"+this.image_index+".svg)";
        return url;
    }

    getOpacity(index: number ) : any{
        var opacity = 1;
        if(index == this.span_index)
            opacity = 0.6;
        return opacity;
    }

    openSlideshow(slide: number): void {
        if (this.post.post_type === 1) {
            this.slide = slide;
        }
    }

    moveSlideshow(toSlide: number) : void {
        this.slide = this.slideshow('.slider').move(toSlide);
    }

    closeSlideshow() : void {
        this.slide = -1;
    }

    private returnNull(arg: any) : boolean {
        return false;
    }
}

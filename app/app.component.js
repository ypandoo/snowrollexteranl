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
var AppData = (function () {
    function AppData() {
    }
    return AppData;
}());
exports.AppData = AppData;
var AppComponent = (function () {
    function AppComponent() {
        this.app = {
            link: 'https://itunes.apple.com/us/app/snowroll-voicetags-to-make-your-photos-alive/id1219000500?mt=8',
            directive: 'Open in App'
        };
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'snowroll-web-app',
            template: "\n    <header class=\"page-head\">\n        <img class=\"logo-img\" src=\"assets/img/logo-image.svg\" alt=\"x\" />\n        <img class=\"logo-text\" src=\"assets/img/logo-text.svg\" alt=\"Snowroll\" />\n        <a class=\"app-link\" href=\"{{app.link}}\">{{app.directive}}</a>\n    </header>\n    <router-outlet></router-outlet>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
import { Component }   from '@angular/core';

export class AppData {
    link: string;
    directive: string;
}

@Component({
  selector: 'snowroll-web-app',
  template: `
    <header class="page-head">
        <img class="logo-img" src="assets/img/logo-image.svg" alt="x" />
        <img class="logo-text" src="assets/img/logo-text.svg" alt="Snowroll" />
        <a class="app-link" href="{{app.link}}">{{app.directive}}</a>
    </header>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
    app: AppData = {
        link: 'https://itunes.apple.com/us/app/snowroll-voicetags-to-make-your-photos-alive/id1219000500?mt=8',
        directive: 'Open in App'
    };
}

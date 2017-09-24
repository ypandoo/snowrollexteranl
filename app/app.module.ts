import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { HttpModule }    from '@angular/http';

import { MetaModule }    from 'ng2-meta';

import { AppComponent }  from './app.component';
import { RootComponent } from './root.component';
import { PostComponent } from './post.component';
import { DataService }   from './data.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', component: RootComponent },
            { path: 'posts/:id', component: PostComponent }
        ]),
        MetaModule.forRoot()
    ],
    declarations: [ AppComponent, RootComponent, PostComponent ],
    providers: [ DataService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}

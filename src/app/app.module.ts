import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ChordBoxComponent } from './chord-box/chord-box.component';
import { AutofocusDirective } from './chord-box/directives/autofocus';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    ChordBoxComponent,
    AutofocusDirective,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

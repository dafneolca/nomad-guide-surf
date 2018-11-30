import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { PageStatusService } from './services/page-status.service';

import { KeysPipe } from './keys.pipe';

import { SidebarComponent } from './sidebar/sidebar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModal } from './modal/modal';


@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    SidebarComponent,
    NgbdModal
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    MatTooltipModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    NgbModule.forRoot()
  ],
  providers: [PageStatusService],
  bootstrap: [AppComponent]
})
export class AppModule { }


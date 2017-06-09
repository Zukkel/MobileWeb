import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { BildUebersichtPage } from '../pages/bild-uebersicht/bild-uebersicht';
import { DetailAnsichtPage } from './../pages/detail-ansicht/detail-ansicht';
import { BildBearbeitenPage } from './../pages/bild-bearbeiten/bild-bearbeiten';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    BildUebersichtPage,
    DetailAnsichtPage,
    BildBearbeitenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BildUebersichtPage,
    DetailAnsichtPage,
    BildBearbeitenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

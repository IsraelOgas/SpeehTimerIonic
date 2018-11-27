import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { TimerComponent } from '../components/timer/timer';

import { NativeAudio } from '@ionic-native/native-audio';

import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TimerComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TimerComponent,
    Network,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

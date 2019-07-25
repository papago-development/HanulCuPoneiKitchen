import { Component, ViewChild } from '@angular/core';
import {Nav, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {FcmProvider} from "../providers/fcm/fcm";
import {tap} from "rxjs/operators";
import {Firebase} from "@ionic-native/firebase";
import {NativeAudio} from "@ionic-native/native-audio";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public fcm: FcmProvider,
              public toastCtrl: ToastController,
              public firebaseNative: Firebase,
              private nativeAudio: NativeAudio) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.fcm.getToken();
      this.fcm.subscribeToTopic();
      // if (this.platform.is('android')) {
      //   let token = this.firebaseNative.getToken().then(token =>{
      //     const toast = this.toastCtrl.create({
      //       message: token,
      //       duration: 3000
      //     });
      //     toast.present();
      //
      //   });
      // }
      this.nativeAudio.preloadComplex('track1', 'assets/sounds/alert.mp3', 1, 1, 0)
      // then(this.onSuccessPreloading, this.onError);
      this.fcm.listenToNotifications().subscribe( data => {

        // var mySound = new Media(data.sound);
        if(data.wasTapped){
          this.nav.setRoot('HomePage', { 'mesaj': data.data2 });
          //Notification was received on device tray and tapped by the user.
        }else{

          // this.nativeAudio.preloadComplex('track1', 'assets/sounds/alert.mp3', 1, 1, 0);
          // then(this.onSuccessPreloading, this.onError);

          // this.nativeAudio.preloadSimple('alert', 'alert.mp3');
          // this.nativeAudio.play('alert');
          this.nativeAudio.play("track1").then(this.onSuccessPlaying, this.onError);
          // alert( JSON.stringify(data.data2) );

          alert( 'AVETI O COMANDA NOUA' );


          //Notification was received in foreground. Maybe the user needs to be notified.
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onSuccessPreloading = data => {
    console.log("success preloading", data);
    this.nativeAudio.play("track1").then(this.onSuccessPlaying, this.onError);
  };

  onError(){
    console.log('error');
  }

  onSuccessPlaying(){ console.log('ok');}

}

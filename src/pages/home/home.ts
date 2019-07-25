import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from "rxjs/Rx";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mesaj: string;
  orders: Observable<any[]>;
  timeexceeded: number = 21;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public db: AngularFirestore) {

    this.mesaj = this.navParams.get('mesaj');
    if (this.mesaj)
      this.presentToast(this.mesaj);
    this.orders = db.collection('Comenzi').valueChanges();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ModalGdprPage');
    if (this.mesaj)
      this.presentToast(this.mesaj);
  }

  presentToast(mesaj) {
    let toast = this.toastCtrl.create({
      message: `${mesaj} a fost adaugat la cosul Dvs.`,
      showCloseButton: false,
      duration: 3000,
      cssClass: 'changeToast',
      closeButtonText: 'View Cart'
    });

    // toast.onDidDismiss(() => {
    //   this.navCtrl.push('CartPage');
    // });
    toast.present();
  }












}

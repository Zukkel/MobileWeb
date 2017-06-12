import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-bild-bearbeiten',
  templateUrl: 'bild-bearbeiten.html'
})
export class BildBearbeitenPage {

  image: String;

  constructor(public navCtrl: NavController, private navParams: NavParams, private toastCtrl: ToastController) {
    // get the image that has been passed
    this.image = navParams.get("image");
  }

  /**
   * Save the changes applied to the image
   */
  public saveImage(): void {

    // TODO add code to save image

    // Display a toast on success
    let toast = this.toastCtrl.create({
      message: "Bild gespeichert.",
      duration: 2000
    });
    toast.present();

    // Go back to the detail page
    this.navCtrl.popTo(DetailAnsichtPage);
  }

  /**
   * Cut the image into a smaller shape
   */
  public cutImage(): void {
  
  }

  /**
   * Apply the selected filter to the image
   */
  public applyFilter(): void {
  
  }

  /**
   * Rotate the image 90 degrees to the left
   */
  public rotateImage(): void {
  
  }
}
import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-bild-bearbeiten',
  templateUrl: 'bild-bearbeiten.html'
})
export class BildBearbeitenPage {

  image: String = null;
  edited: boolean = false;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    // get the image that has been passed
    this.image = navParams.get("image");

    // listen to the hardware back button in order to confirm not saving changes made to the image
    this.platform.registerBackButtonAction(this.confirmBackWithoutSaving);
  }

  /**
   * Asks the user to really leave the screen without saving his edited image
   */
  private confirmBackWithoutSaving(): void {
      if (this.edited == true) {
        // Ask the user if he really wants to leave
          let alert = this.alertCtrl.create({
          title: "Seite verlassen",
          subTitle: "Die Seite verlassen ohne Änderungen zu speichern?",
          buttons: [{
            text: "Abbrechen",
            role: "cancel"
          }, {
            text: "Verlassen",
            handler: () => {
              // Go back to the detail page
              this.navCtrl.popTo(DetailAnsichtPage);
            }
          }]
        });
        alert.present();
      } else {
        // Go back to the detail page
        this.navCtrl.popTo(DetailAnsichtPage);
      }
  }

  /**
   * Save the changes applied to the image
   */
  public saveImage(): void {
    let alert = this.alertCtrl.create({
      title: "Bild speichern",
      subTitle: "Die getätigten Änderungen wirklich übernehmen?",
      buttons: [{
        text: "Abbrechen",
        role: "cancel"
      }, {
        text: "Speichern",
        handler: () => {
          
          // TODO save image here later

          // Display a toast on success
          let toast = this.toastCtrl.create({
            message: "Änderungen gespeichert.",
            duration: 2000
          }); toast.present();

          // Go back to the detail page
          this.navCtrl.popTo(DetailAnsichtPage);
        }
      }]
    });
    alert.present();
  }

  /**
   * Cut the image into a smaller shape
   */
  public cutImage(): void {
    this.edited = true;
  }

  /**
   * Apply the selected filter to the image
   */
  public applyFilter(): void {
    this.edited = true;
  }

  /**
   * Rotate the image 90 degrees to the left
   */
  public rotateImage(): void {
    this.edited = true;
  }
}
import { BildUebersichtPage } from './../bild-uebersicht/bild-uebersicht';
import { BildBearbeitenPage } from './../bild-bearbeiten/bild-bearbeiten';
import { NavController, NavParams, FabContainer, ToastController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Shake } from '@ionic-native/shake';

@Component({
  selector: 'page-detail-ansicht',
  templateUrl: 'detail-ansicht.html',
  providers: [[Shake], [SocialSharing]]
})
export class DetailAnsichtPage {

  image: String;
  folders: Array<{name: string, path: string, filterOn: boolean}>;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private shake: Shake,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing
  ) {
    // create a listener for shake gestures
    this.shake.startWatch(30).subscribe(() => {
      // TODO access the available images here later
    });

     // TODO remove hardcoded folders later
    this.folders = [
      { name: 'Urlaub',  path: "/" + name, filterOn: false },
      { name: 'Zuhause', path: "/" + name, filterOn: false },
      { name: 'Technik', path: "/" + name, filterOn: false },
      { name: 'Natur',   path: "/" + name, filterOn: false }
    ];

    // get the random image that has been passed
    this.image = navParams.get("image");
    // Display the images name in a toast to let the user know which one he got exactly
    let toast = this.toastCtrl.create({
      message: "Aktuelles Bild: " + this.image.match(/.*\/(.*)$/)[1],
      duration: 2000
    }); toast.present();
  }

  /**
   * Open the edit screen with the currently viewed image
   */
  public openEditScreen(): void {
    this.navCtrl.push(BildBearbeitenPage, {image: this.image});
  }

  /**
   * Close the entire fab list
   * @param fab the individual fab button
   */
  refresh(fab?: FabContainer): void {
    if (fab !== undefined) {
      setTimeout(function() { 
        fab.close();
      }, 200);
    }
  }

  /**
   * Displays a selection dialog with all current category folders
   */
  public chooseFolder(): void {
    let alert = this.alertCtrl.create({
      title: "Kategorie wählen",
      buttons: [{
        text: "Abbrechen",
        role: "cancel"
      }, {
        text: "Ändern",
        handler: () => {
          // TODO set category of the current image here later

          // Display a toast on success
          let toast = this.toastCtrl.create({
            message: "Bildkategorie erfolgreich geändert.",
            duration: 2000
          }); toast.present();
        }
      }]
    });
    // Add all possible category options
    alert.addInput({type: 'radio', label: "Ohne Kategorie", value: "Ohne Kategorie", checked: true});
    // TODO read the currently selected category and set the 'checked' state accordingly
    for(var i = 0; i < this.folders.length; i++) {
      alert.addInput({type: 'radio', label: this.folders[i].name, value: this.folders[i].name});
    }
    alert.present();
  }

  /**
   * Delete the currently displayed image and go back to the main screen
   */
  public deleteImage(): void {
    let alert = this.alertCtrl.create({
      title: "Bild löschen",
      subTitle: "Das aktuelle Bild wirklich löschen?",
      buttons: [{
        text: "Abbrechen",
        role: "cancel"
      }, {
        text: "Löschen",
        handler: () => {
          
          // TODO delete image here later

          // Display a toast on success
          let toast = this.toastCtrl.create({
            message: "Bild gelöscht.",
            duration: 2000
          }); toast.present();

          // Go back to the homescreen
          this.navCtrl.popTo(BildUebersichtPage);
        }
      }]
    });
    alert.present();
  }

  // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

  /**
   * Share via email
   */ 
  public shareWithEmail(): void {
    this.socialSharing.shareViaEmail("Nachricht", "Betreff", ["Empfänger"], null, null, null /* bilder */).then(() => {
    // Success!
    }).catch(() => {
    // Error!
    });
  }

  /**
   * Share to facebook
   */
  public shareToFacebook(): void {
    this.socialSharing.shareViaFacebook("Message", null /* image */, null /* link */).then(() => {
    // Success!
    }).catch(() => {
    // Error!
    });
	}

  /**
   * Share to twitter
   */
  public shareToTwitter(): void {
    this.socialSharing.shareViaTwitter("Message", null /* image */, null /* link */).then(() => {
    // Success!
    }).catch(() => {
    // Error!
    });
	}

  /**
   * Share to whatsapp
   */
  public shareToWhatsapp(): void {
    this.socialSharing.shareViaWhatsApp("Message", null /* image */, null /* link */).then(() => {
    // Success!
    }).catch(() => {
    // Error!
    });
	}
}

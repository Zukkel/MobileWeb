import { BildBearbeitenPage } from './../bild-bearbeiten/bild-bearbeiten';
import { NavController, NavParams, FabContainer, ToastController } from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private shake: Shake,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing
  ) {
    // create a listener for shake gestures
    this.shake.startWatch(30).subscribe(() => {
      // TODO access the available images here later
    });

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
   * Shows the category bar only if needed
   */
  public toggleCategoryBar(): void {
    var bar = document.getElementById("categoryBar");
    bar.classList.toggle("animate");
  }

  /**
   * Delete the currently displayed image and go back to the main screen
   */
  public deleteImage(): void {
    // TODO add code
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

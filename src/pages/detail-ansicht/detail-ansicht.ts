import { BildBearbeitenPage } from './../bild-bearbeiten/bild-bearbeiten';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Shake } from '@ionic-native/shake';

@Component({
  selector: 'page-detail-ansicht',
  templateUrl: 'detail-ansicht.html',
  providers: [[Shake], [SocialSharing]]
})
export class DetailAnsichtPage {

  constructor(public navCtrl: NavController, private shake: Shake, private socialSharing: SocialSharing) {
    // create a listener for shake gestures
    this.shake.startWatch(30).subscribe(() => {
      // open a random image from the current selection
    });
  }

  /**
   * Open the edit screen with the currently viewed image
   */
  public openEditScreen(): void {
    this.navCtrl.push(BildBearbeitenPage, null /* pass image file here */);
  }
  /**
   * Shows the category bar only if needed
   */
  public toggleCategoryBar(): void {
    var bar = document.getElementById('categoryBar')
    if(bar.style.display == 'none') {
      bar.style.display = 'block';
    } else {
      bar.style.display = 'none';
    }
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

import { BedienungsanleitungPage } from './../bedienungsanleitung/bedienungsanleitung';
import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController, ModalController, FabContainer, ToastController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ISubscription } from "rxjs/Subscription";

declare var Dropbox: any;

@Component({
  selector: 'page-bild-uebersicht',
  templateUrl: 'bild-uebersicht.html',
  providers: [[Shake], [Camera], [ModalController], [ImagePicker]]
})

export class BildUebersichtPage {

  images: Array<string>;
  watch: ISubscription;

  constructor(
    public navCtrl: NavController,
    private shake: Shake,
    private camera: Camera,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private imagePicker: ImagePicker
  ) {
    // TODO remove later
    this.images = [
      "assets/img/testbild.png",
      "assets/img/testbild.png",
      "assets/img/testbild.png",
      "assets/img/testbild.png"
    ];
  }

  /**
   * Watch for shake gesture to open a random image when the view loads
   */
  ionViewDidEnter() {
    // create a listener for shake gestures
    this.watch = this.shake.startWatch(30).subscribe(() => {
      // open a random image from the current selection
      this.navCtrl.push(DetailAnsichtPage, {image: this.getRandomPicture(this.images)});
    });
  }

  /**
   * Remove the shake listener on view leave
   */
  ionViewDidLeave() {
    this.watch.unsubscribe();
  }

  /**
   * Returns a random image from "images"
   */
  private getRandomPicture(images: Array<string>): string {
    var image = this.images[Math.floor(Math.random()*this.images.length)];
    return image;
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
   * Take a new picture with the camera
   */
  public takePicture(): void {
    const options: CameraOptions = {
      quality: 75,
      allowEdit: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageURI) => {
      this.images.push(imageURI);
      // Display a toast on success
      let toast = this.toastCtrl.create({
        message: "Bild erfolgreich importiert.",
        duration: 2000
      }); toast.present();
    }, (err) => {
      // Display a toast on fail
      let toast = this.toastCtrl.create({
        message: "Bild-Import fehlgeschlagen!",
        duration: 2000
      }); toast.present();
    });
  }

  /**
   * Opens a gallery screen to import images to the app
   */
  public openGallery(): void {
    let options = {
      maximumImagesCount: 10,
      width: 500,
      height: 500,
      quality: 100
    }

    this.imagePicker.getPictures(options).then((results) => {
      var i = 0;
      for (i = 0; i < results.length; i++) {
        this.images.push(results[i]);
      }
      if(i > 0) {
        // Display a toast on success
        let toast = this.toastCtrl.create({
          message: i + " Bild(er) erfolgreich importiert.",
          duration: 2000
        }); toast.present();
      }
    }, (err) => {
      // Display a toast on fail
      let toast = this.toastCtrl.create({
        message: "Bild-Import fehlgeschlagen!",
        duration: 2000
      }); toast.present();
    });
	}

  /**
   * Import pictures from cloud service
   */
  public importFromCloud(): void {
    // Remember 'this' in order to display toasts in the declared inline functions
    var _this = this;

    function SuccessCallback() {
      function checkIfImage(file) {
        return(file.match(/\.(jpeg|jpg|gif|bmp|png)$/) != null);
      }

      client.readdir("/", function(error, entries) {
        if (error) {
          // Display a toast on fail
          let toast = _this.toastCtrl.create({
            message: "Fehler: " + error,
            duration: 2000
          }); toast.present();
        }

        for (var i = 0; i < entries.length; i++) {
          // Only look for image files and ignore all other ones in the dropbox
          if(checkIfImage(entries[i])) {
            // Display a toast for each image found
            let toast = _this.toastCtrl.create({
              message: "Datei: " + entries[i],
              duration: 2000
            }); toast.present();
          } 
        }
      });
    }

    var DROPBOX_APP_KEY = 'wjdaz8p7g8ms2kw';
    const client = new Dropbox.Client({key: DROPBOX_APP_KEY});
    client.authDriver(new Dropbox.AuthDriver.Cordova());

    // Open the login form of Dropbox and if the user already granted the access only execute the SuccessCallback         
    client.authenticate({ interactive: true }, function(error) {

      // Handle potential error
      if (error) {
          let toast = _this.toastCtrl.create({
          message: 'Authentifikationsfehler: ' + error,
          duration: 2000
        }); toast.present();
        return;
      }
      
      if(client.isAuthenticated()) {
        let toast = _this.toastCtrl.create({
          message: "Verbindung zu Dropbox erfolgreich.",
          duration: 2000
        }); toast.present();
        SuccessCallback();
      } else {
        let toast = _this.toastCtrl.create({
          message: "Dropbox-Authentifikation fehlgeschlagen.\nVersuchen Sie es erneut!",
          duration: 2000
        }); toast.present();
      }
    });
  }

  /**
   * Import pictures from flickr app
   */
  public importFromFlickr(): void {
    // TODO add cloud import code
  }

  /**
   * Displays an instruction popup that explains how the app works
   */
  public showInstructions(): void {
    // Open the instructions popup
    let infoModal = this.modalCtrl.create(BedienungsanleitungPage);
    infoModal.present();
  }
}

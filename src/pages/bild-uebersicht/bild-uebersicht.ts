import { BedienungsanleitungPage } from './../bedienungsanleitung/bedienungsanleitung';
import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController, ModalController, FabContainer, ToastController, AlertController  } from 'ionic-angular';
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

  images: Array<{url: string, checked: boolean}>;
  watch: ISubscription;
  folders: Array<{name: string, path: string, filterOn: boolean}>;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private shake: Shake,
    private camera: Camera,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private imagePicker: ImagePicker
  ) {

    // TODO remove hardcoded folders later
    this.folders = [
      { name: 'Urlaub',  path: "/" + name, filterOn: false },
      { name: 'Zuhause', path: "/" + name, filterOn: false },
      { name: 'Technik', path: "/" + name, filterOn: false },
      { name: 'Natur',   path: "/" + name, filterOn: false }
    ];

    // TODO remove later
    this.images = [
      { url: "assets/img/testbild.png", checked: false },
      { url: "assets/img/testbild.png", checked: false },
      { url: "assets/img/testbild.png", checked: false },
      { url: "assets/img/testbild.png", checked: false }
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
   * Display a toast message
   * @param text The text of the message
   */
  private makeToast(text): void {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000
    }); toast.present();
  }

  /**
   * Toggles the checkmark on image containers
   */
  public toggleImageChecked(index: number): void {
    this.images[index].checked = !this.images[index].checked;
    var showFolderButton = false;

    // Keep the folder button active if at least one image is selected
    for(var i = 0; i < this.images.length; i++) {
      if(this.images[i].checked == true) {
        showFolderButton = true;
        break;
      }
    }

    // Apply the css if at least one image is selected
    this.showFolderButton(showFolderButton);
  }

  /**
   * Shows or hides the folder button in the navigation bar
   * @param showFolderButton boolean display state of the button
   */
  private showFolderButton(showFolderButton): void {
    var displayFolderButton = document.getElementById("folderButton");
    if(showFolderButton == true) {
      displayFolderButton.style.display = "block";
    } else {
      displayFolderButton.style.display = "none";
    }
  }

  /**
   * Returns a random image from "images"
   */
  private getRandomPicture(images: Array<{url: string, checked: boolean}>): string {
    var image = this.images[Math.floor(Math.random()*this.images.length)];
    return image.url;
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
          // TODO set categories of all selected images to the chosen one

          // Aufheben der aktuellen Auswahl
          this.images.forEach(function(image) {
            image.checked = false
          });

          // Hide the folder button
          this.showFolderButton(false);

          // Display a toast on success
          this.makeToast("Kategorie der ausgewählten Bilder geändert.");
        }
      }]
    });
    // Add all possible category options
    alert.addInput({type: 'radio', label: "Ohne Kategorie", value: "Ohne Kategorie", checked: true});
    /* TODO read the currently selected category and set the 'checked' state accordingly ...
     ... if only one images is selected, otherwise keep the default to the first one */
    for(var i = 0; i < this.folders.length; i++) {
      alert.addInput({type: 'radio', label: this.folders[i].name, value: this.folders[i].name});
    }
    alert.present();
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
      this.images.push({ url: imageURI, checked: false});
      // Display a toast on success
      this.makeToast("Bild erfolgreich importiert.");
    }, (err) => {
      // Display a toast on fail
      this.makeToast("Bild-Import fehlgeschlagen!");
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
        this.images.push({ url: results[i], checked: false});
      }
      if(i > 0) {
        // Display a toast on success
        this.makeToast(i + " Bild(er) erfolgreich importiert.");
      }
    }, (err) => {
      // Display a toast on fail
      this.makeToast("Bild-Import fehlgeschlagen!");
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
          _this.makeToast("Fehler: " + error);
        }

        for (var i = 0; i < entries.length; i++) {
          // Only look for image files and ignore all other ones in the dropbox
          if(checkIfImage(entries[i])) {
            // Display a toast for each image found
            _this.makeToast("Datei: " + entries[i]);
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
        _this.makeToast("Authentifikationsfehler: " + error);
        return;
      }
      
      if(client.isAuthenticated()) {
        _this.makeToast("Verbindung zu Dropbox erfolgreich.");
        SuccessCallback();
      } else {
        _this.makeToast("Dropbox-Authentifikation fehlgeschlagen.\nVersuchen Sie es erneut!");
      }
    });
  }

  /**
   * Import pictures from flickr app
   */
  public importFromFlickr(): void {
    // TODO add cloud import code
    this.makeToast("Diese Option ist noch nicht vorhanden.");
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

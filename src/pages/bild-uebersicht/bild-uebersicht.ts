import { BedienungsanleitungPage } from './../bedienungsanleitung/bedienungsanleitung';
import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-bild-uebersicht',
  templateUrl: 'bild-uebersicht.html',
  providers: [[Shake], [Camera], [ModalController], [ImagePicker]]
})

export class BildUebersichtPage {

  images: Array<string>;	

  constructor(public navCtrl: NavController, private shake: Shake, private camera: Camera, private modalCtrl: ModalController, private imagePicker: ImagePicker) {
    // create a listener for shake gestures
    shake.startWatch(30).subscribe(() => {
      // open a random image from the current selection
      this.navCtrl.push(DetailAnsichtPage, {image: this.getRandomPicture(this.images)});
    });

    // TODO remove later
    this.images = [
      "assets/img/testbild.png",
      "assets/img/testbild.png",
      "assets/img/testbild.png",
      "assets/img/testbild.png"
    ];
  }

  /**
   * Returns a random image from "images"
   */
  private getRandomPicture(images: Array<string>): string {
    var image = this.images[Math.floor(Math.random()*this.images.length)];
    return image;
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
    }, (err) => {
      // on fail
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
      for (var i = 0; i < results.length; i++) {
        this.images.push(results[i]);
      }
    }, (err) => { });
	}

  /**
   * Import pictures from cloud service
   */
  public importFromCloud(): void {
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

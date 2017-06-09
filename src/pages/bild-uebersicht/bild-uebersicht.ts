import { DetailAnsichtPage } from './../detail-ansicht/detail-ansicht';
import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Shake } from '@ionic-native/shake';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-bild-uebersicht',
  templateUrl: 'bild-uebersicht.html'
})

export class BildUebersichtPage {

  images: Array<string>;	
	grid: Array<Array<string>>;

  constructor(public navCtrl: NavController) {
    // create a listener for shake gestures
    var shake: Shake = new Shake();
    shake.startWatch(40).subscribe(() => {
      // open a random image from the current selection
      this.navCtrl.push(DetailAnsichtPage);
    });

    // TODO remove later
    this.images = [
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/FuBK_testcard_vectorized.svg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/FuBK_testcard_vectorized.svg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/FuBK_testcard_vectorized.svg",
      "https://upload.wikimedia.org/wikipedia/commons/1/1c/FuBK_testcard_vectorized.svg"
    ];

    this.refreshGrid();
  }

  /**
   * Take a new picture with the camera
   */
  public takePicture(): void {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      sourceType: camera.PictureSourceType.CAMERA,
      destinationType: camera.DestinationType.FILE_URI,
      encodingType: camera.EncodingType.JPEG,
      mediaType: camera.MediaType.PICTURE
    }

    var camera: Camera = new Camera();
    camera.getPicture(options).then((imageURI) => {
      // on success
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

    var imagePicker: ImagePicker = new ImagePicker();

    imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.images.push(results[i]);
      }
      this.refreshGrid();
    }, (err) => { });
	}

  /**
   * Import pictures from cloud service
   */
  public importFromCloud(): void {
    // TODO add cloud import code
  }

  /**
   * Rebuilds the image grid using the imported images
   */
  public refreshGrid(): void {

  	this.grid = Array(Math.ceil(this.images.length/2));

    let rowNum = 0;
  	
  	for (let i = 0; i < this.images.length; i+=2) {
  		
  		this.grid[rowNum] = Array(2);
  		
  		if (this.images[i]) {
  			this.grid[rowNum][0] = this.images[i]
  		}
  		
  		if (this.images[i+1]) {
  			this.grid[rowNum][1] = this.images[i+1]
  		}
  		
  		rowNum++;
  	}
  }
}

import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-bedienungsanleitung',
  templateUrl: 'bedienungsanleitung.html',
})
export class BedienungsanleitungPage {

  constructor(public viewCtrl: ViewController) {}

  public closePage(): void {
    // Go back to the home screen
    this.viewCtrl.dismiss();
  }
}

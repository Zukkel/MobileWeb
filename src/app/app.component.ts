import { DetailAnsichtPage } from './../pages/detail-ansicht/detail-ansicht';
import { BildBearbeitenPage } from './../pages/bild-bearbeiten/bild-bearbeiten';
import { BildUebersichtPage } from '../pages/bild-uebersicht/bild-uebersicht';

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController, Keyboard, AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = BildUebersichtPage;

  pages:   Array<{title: string, component: any}>;
  folders: Array<{name: string, path: string, filterOn: boolean}>;

  // This variable defines whether or not to display images without any category at all
  noCategoryFilterOn: boolean = false;

  constructor(
    public platform: Platform,
    private alertCtrl: AlertController,
    public keyboard: Keyboard,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();

    // TODO remove hardcoded folders later
    this.folders = [
      { name: 'Urlaub',  path: "/" + name, filterOn: false },
      { name: 'Zuhause', path: "/" + name, filterOn: false },
      { name: 'Technik', path: "/" + name, filterOn: false },
      { name: 'Natur',   path: "/" + name, filterOn: false }
    ];

    // set our app's pages
    this.pages = [
      { title: 'Bildübersicht', component: BildUebersichtPage },
      { title: 'Detailansicht', component: DetailAnsichtPage },
      { title: 'Bild bearbeiten', component: BildBearbeitenPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  hideKeyboard(event) {
    // Hide the keyboard (for example after a text has been submitted)
    event.preventDefault();
    this.keyboard.close();
  }

  /**
   * Displays a alert to ask to user to really delete a folder
   * @param index The selected folders index
   */
  private showDeleteFolderAlert(index: number): void {
    // Remember the name of the folder
    var folderName = this.folders[index].name;

    let alert = this.alertCtrl.create({
      title: "Kategorie löschen",
      subTitle: "Den Ordner \"" + folderName + "\" wirklich löschen?",
      buttons: [{
        text: "Abbrechen",
        role: "cancel"
      }, {
        text: "Löschen",
        handler: () => {
          this.folders.splice(index, 1);
          // Display a toast on success
          let toast = this.toastCtrl.create({
            message: "Ordner \"" + folderName + "\" gelöscht.",
            duration: 2000
          }); toast.present();
        }
      }]
    });
    alert.present();
  }

  /**
   * Create a new folder to act as a new image category
   */
  public createFolder(): void {
    if(this.folders.length <= 15) {
      // Create a nameless folder so the user can rename it himself
      this.folders.push({ name: null,  path: "/" + name, filterOn: false });
    } else {
      // Tell the user that he cannot create more than 20 folders
      let toast = this.toastCtrl.create({
        message: "Maximalanzahl von 15 Ordnern erreicht!",
        duration: 2000
      }); toast.present();
    }
  }

  /**
   * Delete the selected folder by index
   * @param index The selected folders index
   */
  public deleteFolder(index: number): void {
    if (index > -1 && index <= this.folders.length) {
      // Ask the user if he really wants to delete the folder
      this.showDeleteFolderAlert(index);
    } else {
      // Display a toast on fail
      let toast = this.toastCtrl.create({
        message: "Löschen des Ordners fehlgeschlagen!",
        duration: 2000
      }); toast.present();
    }
  }
}

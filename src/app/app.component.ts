import { DetailAnsichtPage } from './../pages/detail-ansicht/detail-ansicht';
import { BildBearbeitenPage } from './../pages/bild-bearbeiten/bild-bearbeiten';
import { BildUebersichtPage } from '../pages/bild-uebersicht/bild-uebersicht';

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController  } from 'ionic-angular';

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

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();

    // TODO remove hardcoded folders later
    this.folders = [
      { name: 'Urlaub',  path: "", filterOn: false },
      { name: 'Zuhause', path: "", filterOn: false },
      { name: 'Technik', path: "", filterOn: false },
      { name: 'Natur',   path: "", filterOn: false },
      { name: 'Lustig',  path: "", filterOn: false }
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

  /**
   * Create a new folder to act as a new image category
   */
  public createFolder(): void {

  }

  /**
   * Delete the selected folder
   * @param index The selected folder
   */
  public deleteFolder(index: string): void {
    let toast = this.toastCtrl.create({
      message: "Ordner \"" + index + "\" gelöscht.",
      duration: 2000
    }); toast.present();
  }

  /**
   * Rename the selected folder
   * @param index The selected folder
   */
  public renameFolder(index: string): void {
    let toast = this.toastCtrl.create({
      message: "Ordner \"" + index + "\" in \"" + index + "\" umbenannt.",
      duration: 2000
    }); toast.present();
  }
}

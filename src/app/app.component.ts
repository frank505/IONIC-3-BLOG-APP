import { Component, ViewChild } from '@angular/core';
import { Nav, Platform , MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {ServicePage} from  '../pages/service/service';
import {AboutusPage } from '../pages/aboutus/aboutus';
//import {ContactusPage} from '../pages/contactus/contactus';
import {BlogPage} from '../pages/blog/blog';
import { MessagemePage } from '../pages/messageme/messageme';
import { SettingsPage } from '../pages/settings/settings';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(public platform: Platform,
     public statusBar: StatusBar, 
     public splashScreen: SplashScreen,
    public menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:"home" },
      { title: 'Services', component: ServicePage,icon:"cog" },
      {title:'About', component:AboutusPage,icon:"information-circle"},
      {title:'More', component:BlogPage,icon:"add-circle"},
      {title:'Send Us A Message',component:MessagemePage, icon:"mail"},
      {title:'Settings',component:SettingsPage, icon:"settings"},
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
    this.menu.close();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpPage} from '../help/help';
import {PrivacyPage} from '../privacy/privacy';
import {TermsofusePage} from '../termsofuse/termsofuse';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Privacy Policy ', component: PrivacyPage },
      { title: 'Help', component:HelpPage},
      {title:'Terms Of use', component:TermsofusePage},
    ];

  }

  openPage(page) {
  this.navCtrl.push(page.component);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}

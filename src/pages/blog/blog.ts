import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsContentPage} from '../tabs-content/tabs-content';
import {TabsMainPage} from '../tabs-main/tabs-main';
import {HttpProvider} from '../../providers/http/http';
//import { YoutubePage } from "../youtube/youtube";
import {BlogsettingsPage} from '../blogsettings/blogsettings';


/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {
   

response_data:any;

  TabDynamicItem:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public HttpRequest:HttpProvider
  ) {
  this.LoadDynamicTab();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');
  }

  LoadDynamicTab(){
    this.TabDynamicItem = [
      { title: 'Blog', component: TabsMainPage},
    { title: 'Video', component: TabsContentPage },//this is for the vide o section
    //{ title: 'YouTube', component: YoutubePage },//this will be added in future releases as we had a time problem 
   // { title: 'settings', component: BlogsettingsPage},
    ];
       
  }

}

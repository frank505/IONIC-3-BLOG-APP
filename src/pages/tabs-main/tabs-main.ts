import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import {LoadingController} from 'ionic-angular';
import {BlogcontentPage} from '../blogcontent/blogcontent';
/**
 * Generated class for the TabsMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-main',
  templateUrl: 'tabs-main.html',
})
export class TabsMainPage {
  response_data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public HttpRequest:HttpProvider,public loader:LoadingController,public alert:AlertController) {
      this.LoadCategoryContent();
  }

  LoadFirstTenItem(items){
    this.navCtrl.push(BlogcontentPage,{
     "items":items
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsMainPage');
  }
  AlertMessage(error_title,error_message){
    let alert = this.alert.create({
      title:error_title,
      message:error_message,
      buttons:['Dismiss']
    });
    alert.present();
  }


  LoadCategoryContent(){
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    this.HttpRequest.getData("category").then((res)=>{
    this.response_data = res;
    loader.dismiss();
    }).catch((err)=>{
      this.AlertMessage("error", "there seems to be a problem please check your internet connection");
  });

  }

}

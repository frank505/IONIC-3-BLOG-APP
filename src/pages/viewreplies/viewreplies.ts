import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the ViewrepliesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewreplies',
  templateUrl: 'viewreplies.html',
})
export class ViewrepliesPage {
id:any;
perpage:any = 5;
total_comments_response:any;
total:any;
itemsPerPage:any= 5;
response_data:any;
result:any;
paginate:any;
second_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public HttpProvider:HttpProvider,public loader:LoadingController,
public alert:AlertController) {
    this.getId();
    this.LoadTotalReplies();
    this.fetchFewReplies();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewrepliesPage');
  }

  getId(){
  this.id = this.navParams.get("id");
  console.log(this.id);
  }
  backToContentPage(){
    this.navCtrl.pop();
  }

  AlertMessage(error_title,error_message){
    let alert = this.alert.create({
      title:error_title,
      message:error_message,
      buttons:['Dismiss']
    });
    alert.present();
  }

  LoadTotalReplies(){
    this.HttpProvider.getData("Total-approved-replies?id="+this.id).then((res)=>{
      this.total_comments_response = res;
      console.log(this.total_comments_response);
      this.total = 0;
      for (var total_approved in this.total_comments_response) {
          this.total += this.total_comments_response[total_approved];
      }
      if(this.total==0){
      return;
      }else{
       return this.total;
      }
     }).catch((err)=>{
      this.AlertMessage("error", "there seems to be a problem please check your internet connection");
  });
  }


  fetchFewReplies(){
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    //this.image = "http://localhost/TechMiz/blog/assets/post_header_img";
    this.HttpProvider.getData("replies?id="+this.id+"&perpage="+this.itemsPerPage).then((res)=>{
        this.response_data = res;
        console.log(this.response_data);
        if(this.response_data==null){
              loader.dismiss();
        }else{
          this.result = this.response_data;
          //console.log(this.result);
           loader.dismiss();
           this.result.forEach((element,index) => {
             this.second_id = element.id;
              });
        }
       
    }).catch((err)=>{
      this.AlertMessage("error", "there seems to be a problem please check your internet connection");
  });
  }
  doInfinite(infiniteScroll,second_id,id){
    setTimeout(() => {
      second_id = this.second_id;
      id = this.id;
        this.HttpProvider.
      getData("replies-paginate?id="+this.id+"&perpage="+this.itemsPerPage+"&last_id="+this.second_id).
      then((res)=>{
       this.paginate = res;
       if(this.paginate==null){
        infiniteScroll.complete();
       }else{
        for (let index = 0; index < this.paginate.length; index++) {
          this.result.push (this.paginate[index]);
        }
         
        this.result.forEach((element,index) => {
            second_id = element.id;
          });
           this.id = id;
           this.second_id = second_id;
         infiniteScroll.complete();
       }
      
      }).catch((err)=>{
        this.AlertMessage("error", "there seems to be a problem please check your internet connection");
    });
    //Async operation has ended
   
    }, 500);

  }



  //end of this class
}

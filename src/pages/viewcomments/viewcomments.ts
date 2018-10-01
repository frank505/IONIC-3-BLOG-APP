import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import {ViewrepliesPage} from '../viewreplies/viewreplies';
/**
 * Generated class for the ViewcommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewcomments',
  templateUrl: 'viewcomments.html',
})
export class ViewcommentsPage {
   total_comments_response:any;
   total:any;
   id:any;
   header:any;
   itemsPerPage:any =  4;
   response_data:any;
   paginate:any;
   result:any;
   second_id:any;
   url:any = "http://localhost/TechMiz/blog/blog/read-more/";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public HttpProvider:HttpProvider,public loader:LoadingController,
  public alert:AlertController) {
    this.getId();
    this.loadCommentNotification();
    this.fetchFewComments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewcommentsPage');
  }

   getId(){
    this.id =  this.navParams.get("id");
  console.log(this.id);
    return this.id;
   }
   
   AlertMessage(error_title,error_message){
    let alert = this.alert.create({
      title:error_title,
      message:error_message,
      buttons:['Dismiss']
    });
    alert.present();
  }


  loadCommentNotification(){
    this.HttpProvider.getData("Total-approved-comments?id="+this.id).then((res)=>{
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

  fetchFewComments(){
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    //this.image = "http://localhost/TechMiz/blog/assets/post_header_img";
    this.HttpProvider.getData("comments?id="+this.id+"&perpage="+this.itemsPerPage).then((res)=>{
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
      getData("comments-paginate?post_id="+this.id+"&perpage="+this.itemsPerPage+"&id="+this.second_id).
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

  ViewRepliesPage(id){
    this.navCtrl.push(ViewrepliesPage,{
      "id":id
    });
  }





RepliesToComments(url){
    url = this.url+url;
  window.open(url,'_system');
}

MakeComments(url){
  url = this.url+url;
  window.open(url,'_system');
}


  backToContentPage(){
   this.navCtrl.pop();
  }


  //end of this class
}

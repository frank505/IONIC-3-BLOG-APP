import { Component,ViewChild,AfterViewInit,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import {SafehtmlPipe} from '../../pipes/safehtml/safehtml';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewcommentsPage } from '../viewcomments/viewcomments';
/**
 * Generated class for the BlogfullPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blogfull',
  templateUrl: 'blogfull.html',
})
export class BlogfullPage  implements AfterViewInit {
  @ViewChild('myContainer') container: ElementRef;
  id:any;
  header:any;
  section:any;
  response_data:any;
  id_val:any;
  image:any = "http://localhost/TechMiz/blog/assets/post_header_img";
  lastTenResponse:any;
  store_result:any[];
  sanitize_string:any;
  required:any = 10;
  total:any;
  total_comments_response:any;
  message:any;
  subject:any;
  id_share:any;
  image_name:any;
  content_creator:any;
  url_notification = "http://localhost/TechMiz/blog/blog/read-more/";
  wysiwyg_image:any="http://localhost/TechMiz/blog/assets/wysiwyg_image";
  wysiwyg_video:any = "http://localhost/TechMiz/blog/assets/wysiwyg_video";
  constructor(public navCtrl: NavController, public navParams: NavParams,public HttpProvider:HttpProvider,
  public loader:LoadingController,public sanitizer:SafehtmlPipe,
  public socialSharing: SocialSharing,public alert:AlertController
) {
    this.getId();
    this.getHeader();
    this.SelectSinglePost();
    this.SelectLastRequiredItem();
    this.SelectTotalCommentsApproved();
    this.LoadPostersProfile();
      }

  ngAfterViewInit(): void {
    this.ChangeImgLink();
    this.ChangeVideoUrl();
}
  ionViewDidLoad() {
  //  this.navParams.get("id");
    }

  getId(){
 this.id = this.navParams.get("id");
 return this.id;
  }

  getHeader(){
  this.header = this.navParams.get("header");
  return this.header;
  }

  SendToFullContentPage(user_id,header){
  //  this.blogContent.SendToFullContentPage(user_id,header);
  this.navCtrl.push(BlogfullPage,{
    "id":user_id,
    "header":header,
  })
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

  SelectLastRequiredItem(){
   this.HttpProvider.getData("last-requested?required="+this.required+"&id="+this.id).
   then((res)=>{
    this.lastTenResponse = res;
   // console.log(this.lastTenResponse);
   }).catch((err)=>{
    this.AlertMessage("error", "there seems to be a problem please check your internet connection");
})
  }

  SelectTotalCommentsApproved(){
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
  })
  }
//sends me to view comments page
  SendMeToViewCommentsPage(){

  }
  
  SelectSinglePost(){
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    this.id_val = this.getId();
    this.image = "http://localhost/TechMiz/blog/assets/post_header_img";
    this.HttpProvider.getData("full-post?id="+this.id_val).then(
      (res)=>{
   this.response_data = res;
   loader.dismiss();
   //console.log(this.response_data);
      }
    ).catch((err)=>{
      this.AlertMessage("error", "there seems to be a problem please check your internet connection");
  })
  }

shareContent(){
  console.log(this.response_data);
  for (let index = 0; index < this.response_data.length; index++) {
    this.image_name =  this.response_data[index].file_name;
    this.id_share = this.response_data[index].id;
    this.subject = this.response_data[index].category;
    this.message = this.response_data[index].header;
  }
  this.socialSharing.share(this.message, this.subject, this.image+"/"+this.image_name,this.url_notification+this.id_share).then(()=>{
 console.log("successful");  
  }).catch(()=>{
    console.log("error");
  })
}

 
  ChangeImgLink(){
    setTimeout(() => {
    if(this.container==null){

    }else{
        //console.log(this.container.nativeElement);
        var img_up = this.container.nativeElement.querySelectorAll(".img_up");
        img_up.forEach((element,index) => {
       var split_elem =  element.src.split('/');
          split_elem = split_elem[split_elem.length - 1];
            element.setAttribute("src", this.wysiwyg_image+"/"+split_elem);
        });
       
    }
  }, 2000);
  }

  ChangeVideoUrl(){
   
   setTimeout(() => {

    if(this.container==null){

    }else{

      var vid_up = this.container.nativeElement.querySelectorAll(".vid_up");
      vid_up.forEach((element,index) => {
     var split_elem =  element.src.split('/');
        split_elem = split_elem[split_elem.length - 1];
          element.setAttribute("src", this.wysiwyg_video+"/"+split_elem);
      });
    }
   }, 2000);
  }

  SendToCommentsPage(){
    this.navCtrl.push(ViewcommentsPage,{
      "id":this.id,
      })
  }

  LoadPostersProfile()
  {
    this.id_val = this.getId();
    this.HttpProvider.getData("content-creator?id="+this.id_val).
    then((res)=>{
      this.content_creator = res;
      console.log(res)
    }).catch((err)=>{
     this.AlertMessage("error", "there seems to be a problem please check your internet connection");
 })
  }


  //end of this class
}

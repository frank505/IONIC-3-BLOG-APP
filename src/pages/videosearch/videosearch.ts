import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
/**
 * Generated class for the VideosearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videosearch',
  templateUrl: 'videosearch.html',
})
export class VideosearchPage {
  search_content:any;
  response_data:any;
  result:any;
  id:any;
  limit:any = 4;
  paginate:any;
  video_db_name:any;
  response_video:any;
  result_video:any;
  video:any = "http://localhost/TechMiz/blog/assets/videos";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public HttpProvider:HttpProvider,public loader:LoadingController,
  public alert:AlertController,private streamingMedia: StreamingMedia) {
  }

  AlertMessage(error_title,error_message){
    let alert = this.alert.create({
      title:error_title,
      message:error_message,
      buttons:['Dismiss']
    });
    alert.present();
  }

  search(){
    if(this.search_content==""){

    }else{
      let loader = this.loader.create({
        content: "please wait..."
      });
      loader.present();
      this.HttpProvider.getData("videos-search-post?search="+this.search_content+"&limit="+this.limit).
      then((res)=>{
        //this.result = this.response_data;
        this.response_data = res;
          if(this.response_data.hasOwnProperty('error')){            
          loader.dismiss();
         }else{
           this.result = this.response_data;
           loader.dismiss();
           this.result.forEach((element,index) => {
             this.id = element.id;
           });
         }
        }).catch((err)=>{
          this.AlertMessage("error", "please check your internet connection");
         });
    }
  }

  
  doInfinite(infiniteScroll,id) {
    //Begin async operation
    setTimeout(() => {
      id = this.id;
      console.log(this.id);
        this.HttpProvider.
      getData("search-video-paginate?search="+this.search_content+"&limit="+this.limit+"&id="+this.id).
      then((res)=>{
       this.paginate = res;
       if(this.paginate==null){
        infiniteScroll.complete();
       }else{
        for (let index = 0; index < this.paginate.length; index++) {
          this.result.push (this.paginate[index]);
        }
         
        this.result.forEach((element,index) => {
            id = element.id;
          });
           this.id = id;
         infiniteScroll.complete();
       }
      
      }).catch((err)=>{
        this.AlertMessage("error", "please check your internet connection");
       });
    //Async operation has ended
   
    }, 500);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosearchPage');
  }

  videoPlayNowOnFullScreen(video_id){ 
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();   
    this.HttpProvider.getData("play-video?id="+video_id).then((res)=>{
      this.response_video =res;
      if(this.response_video.hasOwnProperty('error')){
         loader.dismiss();
        let alert = this.alert.create({
          title:"video error",
          message:"sorry this video is no longer available",
          buttons:['Dismiss']
        });
        alert.present();
      }
      else{
        this.result_video = this.response_video;
        this.result_video.forEach((element,index)=>{
         this.video_db_name = element.video_name;
        })
        loader.dismiss();
        let options: StreamingVideoOptions = {
          successCallback: () => { console.log('Video played') },
          errorCallback: (e) => { console.log('Error streaming') },
          orientation: 'landscape'
        };
        
        this.streamingMedia.playVideo(this.video+this.video_db_name, options);
      }
    }).catch((err)=>{
     this.AlertMessage("error", "please check your internet connection");
    });

  }


}

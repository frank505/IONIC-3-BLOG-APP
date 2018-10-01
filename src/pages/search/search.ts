import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
//import {BlogcontentPage} from '../blogcontent/blogcontent';
import {BlogfullPage} from '../blogfull/blogfull';
 /**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
   search_content:any;
   response_data:any;
   result:any;
   id:any;
   limit:any = 4;
   paginate:any;
   image:any = "http://localhost/TechMiz/blog/assets/post_header_img";
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public HttpProvider:HttpProvider,public loader:LoadingController,public alert:AlertController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
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
      this.HttpProvider.getData("search-post?search="+this.search_content+"&limit="+this.limit).then((res)=>{
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
          this.AlertMessage("error", "there seems to be a problem please check your internet connection");
      });
    

    }
  }


  doInfinite(infiniteScroll,id) {
    //Begin async operation
    setTimeout(() => {
      id = this.id;
      console.log(this.id);
        this.HttpProvider.
      getData("search-paginate?search="+this.search_content+"&limit="+this.limit+"&id="+this.id).
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
        this.AlertMessage("error", "there seems to be a problem please check your internet connection");
    });
  
    //Async operation has ended
   
    }, 500);
  }

  
  SendToFullContentPage(id,header){
    this.navCtrl.push(BlogfullPage,{
      "id":id,
      "header":header,
    })
  }





  //end of this class
}

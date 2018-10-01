import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {HttpProvider} from '../../providers/http/http';
import { BlogfullPage } from "../blogfull/blogfull";
import { SearchPage } from '../search/search';
/**
 * Generated class for the BlogcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blogcontent',
  templateUrl: 'blogcontent.html',
})
export class BlogcontentPage {
   header:any;
   response_data:any;
   itemsPerPage:any = 10;
   image:any;
   result:any[];
  id:any="";
  paginate:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  public HttpProvider:HttpProvider,
public loader:LoadingController,public alert:AlertController) {
    this.getContentHeader();
    this.getCurrentItem();
  }
  ionViewDidLoad() {
    this.navParams.get("items");
    //console.log("content loaded successfully")
  }

  getContentHeader(){
    this.header = this.navParams.get("items");
    return this.header;
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
  

  getCurrentItem(){
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    this.image = "http://localhost/TechMiz/blog/assets/post_header_img";
    this.HttpProvider.getData("post?category="+this.header+"&perpage="+this.itemsPerPage).then((res)=>{
        this.response_data = res;
        if(this.response_data==null){
              loader.dismiss();
        }else{
         // console.log(this.response_data);
         this.result = this.response_data;
         //console.log(this.result);
          loader.dismiss();
          this.result.forEach((element,index) => {
            this.id = element.id;
             });
        }
       
    }).catch((err)=>{
      this.AlertMessage("error", "there seems to be a problem please check your internet connection");
  });
  }
  doInfinite(infiniteScroll,id) {
    //Begin async operation
    setTimeout(() => {
      id = this.id;
        this.HttpProvider.
      getData("post-paginate?category="+this.header+"&perpage="+this.itemsPerPage+"&id="+this.id).
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
    })
    //Async operation has ended
   
    }, 500);
  }

  SendToFullContentPage(id,header){
   this.navCtrl.push(BlogfullPage,{
     "id":id,
     "header":header,
   })
  }

  navigateToSearchPage(){
    this.navCtrl.push(SearchPage);
  }
  
//end of typescript class
}

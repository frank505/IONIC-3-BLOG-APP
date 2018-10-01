import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import{HttpProvider} from '../../providers/http/http';
/**
 * Generated class for the MessagemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messageme',
  templateUrl: 'messageme.html',
})
export class MessagemePage {
  user_email:string="";
  user_subject:string="";
  user_message:string="";
  user_name:string="";
  response_data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loader:LoadingController,public alert:AlertController,
public HttpProvider:HttpProvider) {

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagemePage');
  }
  AlertMessage(error_title,error_message){
    let alert = this.alert.create({
      title:error_title,
      message:error_message,
      buttons:['Dismiss']
    });
    alert.present();
  }

  Submit(){
  if(this.user_name==""){
      this.AlertMessage("emtpy", "username field is empty");
     }
  else if(this.user_email==""){
     this.AlertMessage("empty field","email field cannot be left empty");
   }else if(this.user_subject==""){
     this.AlertMessage("empty field","subject field cannot be left empty");
   }else if(this.user_message==""){
     this.AlertMessage("emtpy", "message field cannot be left empty");
   }
   else{
    let loader = this.loader.create({
      content: "please wait..."
    });
    loader.present();
    let data = {
      email:this.user_email,
      subject: this.user_subject,
      message: this.user_message,
      username:this.user_name
    } 
     this.HttpProvider.postData(data, "send-message").then((res)=>{
        this.response_data = res;
        if(this.response_data==null){
          loader.dismiss();
          this.AlertMessage("sent successfully", "message sent successfully");    
        }else{
          let value = this.response_data.error;
          loader.dismiss();
          this.AlertMessage("error", value);
     // console.log(this.response_data);
        }
       
     }).catch((err)=>{
       loader.dismiss();
    this.AlertMessage("error", "there seems to be a problem please check your internet connection"+err);
     })
   }
 
    
  }




  //end of this class
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {ServicePage} from  '../service/service';
import { BlogPage } from '../blog/blog';
import {AboutusPage } from '../aboutus/aboutus';
import { MessagemePage } from '../messageme/messageme';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  year:any;
  date:any;
  goToSlide() {
    this.slides.slideTo(2, 10000);
  }
  ngAfterViewInit() {
   // this.slides.freeMode = true;
  }
  constructor(public navCtrl: NavController) {
    this.ShowYear();
  }
  ShowYear(){
    this.date = new Date();
   this.year = this.date.getFullYear();
  }

  GoToServicePage(){
    this.navCtrl.setRoot(ServicePage);
  }

  GoToBlogPage(){
 this.navCtrl.setRoot(BlogPage);
  }
  GoToAboutUsPage(){
    this.navCtrl.setRoot(AboutusPage);
  }
  GoToMessageMePage(){
    this.navCtrl.setRoot(MessagemePage);
  }

}

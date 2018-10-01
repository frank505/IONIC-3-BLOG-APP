import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogfullPage } from './blogfull';

@NgModule({
  declarations: [
    BlogfullPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogfullPage),
  ],
})
export class BlogfullPageModule {}

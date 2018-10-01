import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogsettingsPage } from './blogsettings';

@NgModule({
  declarations: [
    BlogsettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogsettingsPage),
  ],
})
export class BlogsettingsPageModule {}

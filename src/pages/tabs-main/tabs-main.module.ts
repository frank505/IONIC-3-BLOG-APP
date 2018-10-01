import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsMainPage } from './tabs-main';

@NgModule({
  declarations: [
    TabsMainPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsMainPage),
  ],
})
export class TabsMainPageModule {}

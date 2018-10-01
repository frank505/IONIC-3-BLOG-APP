import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddcommentsPage } from './addcomments';

@NgModule({
  declarations: [
    AddcommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddcommentsPage),
  ],
})
export class AddcommentsPageModule {}

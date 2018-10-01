import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagemePage } from './messageme';

@NgModule({
  declarations: [
    MessagemePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagemePage),
  ],
})
export class MessagemePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageModelPage } from './image-model';
//import { ZoomAreaModule } from 'ionic2-zoom-area';
import { PinchZoomModule } from 'ngx-pinch-zoom';

@NgModule({
  declarations: [
    ImageModelPage,
  ],
  imports: [
    IonicPageModule.forChild(ImageModelPage),
    //ZoomAreaModule,
    PinchZoomModule
  ],
})
export class ImageModelPageModule {}

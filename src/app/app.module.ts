import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AddNewPage} from '../pages/addnew/addnew';
import {AccountPage} from '../pages/account/account';
import {DisputePage} from '../pages/dispute/dispute';
import {TabsPage} from '../pages/tabs/tabs';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {VotePage} from "../pages/vote/vote";
import {UserDisputesPage} from "../pages/user-disputes/user-disputes"
import {MydisputePage} from "../pages/mydispute/mydispute";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {FavoritePage} from "../pages/favorite/favorite";
import {HomePage} from "../pages/home/home";
import {ChartsModule} from 'ng2-charts';
import {File} from '@ionic-native/file';
import {FileTransferObject, FileTransfer} from "@ionic-native/file-transfer";
import {StaticsPage} from "../pages/statics/statics";
import {ProgressBarModule} from "angular-progress-bar";
import {Transfer} from "@ionic-native/transfer";
import {FilePath} from "@ionic-native/file-path";
import {VoteRecordedPage} from "../pages/vote-recorded/vote-recorded";
import {PostsubmitedPage} from "../pages/postsubmited/postsubmited";
import {ChangepassPage} from "../pages/changepass/changepass";
import {Camera} from "@ionic-native/camera";
import { FavserviceProvider } from '../providers/favservice/favservice';
import { FCM } from '@ionic-native/fcm'; 
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { Keyboard } from '@ionic-native/keyboard';
import { Deeplinks } from '@ionic-native/deeplinks';
import { ShareddisputePage } from '../pages/shareddispute/shareddispute';
import { ImageModelPageModule} from "../pages/image-model/image-model.module"
//import { ZoomAreaModule } from 'ionic2-zoom-area';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
//import { ImageViewerController } from 'ionic-img-viewer';
import { ForgetPasswordPage } from "../pages/forget-password/forget-password"
@NgModule({
  declarations: [
    MyApp,
    AddNewPage,
    AccountPage,
    DisputePage,
    VotePage,
    UserDisputesPage,
    TabsPage,
    LoginPage,
    MydisputePage,
    RegisterPage,
    StaticsPage,
    VoteRecordedPage,
    FavoritePage,
    HomePage,
    PostsubmitedPage,
    ChangepassPage,
    ShareddisputePage,
    ForgetPasswordPage 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ChartsModule,
    IonicImageViewerModule,
    ProgressBarModule,
    IonicModule.forRoot(MyApp),
    ImageModelPageModule,
    PinchZoomModule,
    //ImageViewerController
   // ZoomAreaModule.forRoot(),
   // BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddNewPage,
    AccountPage,
    DisputePage,
    VotePage,
    UserDisputesPage,
    TabsPage,
    MydisputePage,
    LoginPage,
    RegisterPage,
    StaticsPage,
    VoteRecordedPage,
    FavoritePage,
    HomePage,
    PostsubmitedPage,
    ChangepassPage,
    ShareddisputePage,
    ForgetPasswordPage
  ],
  providers: [
    //PhotoViewer,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    FileTransfer,
    Transfer,
    FileTransferObject,
    FilePath,
    File,
    FCM,
    Keyboard,
    FavserviceProvider,
    SocialSharing,
    Deeplinks
  ]
})
export class AppModule {
}

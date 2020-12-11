import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, LoadingController, ToastController, App, AlertController,Events} from 'ionic-angular';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Http} from '@angular/http';
import {TabsPage} from '../pages/tabs/tabs';
import {MydisputePage} from "../pages/mydispute/mydispute";
import {FavoritePage} from "../pages/favorite/favorite";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {AccountPage} from "../pages/account/account";
import { Keyboard } from '@ionic-native/keyboard';
import { Deeplinks } from '@ionic-native/deeplinks';
import { ShareddisputePage } from '../pages/shareddispute/shareddispute'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  rootPage: any;
  public loader: any;
  imageBaseUrl='http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  userimage : any ;
  username  : any;

  pages: Array<{ title: string, component: any, icon: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http, private alertCtrl: AlertController,
              public toastCtrl: ToastController, public app: App, public loadingController: LoadingController,public events: Events,private keyboard: Keyboard,private deeplinks: Deeplinks) {

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Dashboard', icon: 'ios-home-outline', component: TabsPage},
      {title: 'My Disputes', icon: 'ios-chatboxes-outline', component: MydisputePage},
      {title: 'Favorites', icon: 'ios-heart-outline', component: FavoritePage},
      {title: 'Account', icon: 'ios-person-outline', component: AccountPage},
      {title: 'Logout', icon: 'ios-power', component: null}
    ];

     this.userimage=localStorage.getItem('userimage') ;
     this.username = localStorage.getItem('username') ;
     console.log("name"+this.username+"iamge"+this.userimage);
     
      events.subscribe('user:created', (image, user) => {
            this.userimage=image;
            this.username=user;
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      
      this.splashScreen.hide();
      this.keyboard.disableScroll(false);
      this.keyboard.hideKeyboardAccessoryBar(false);
      let userID = localStorage.getItem('id');
      console.log(localStorage.getItem('is_remember') , userID)

      if (localStorage.getItem('is_remember') && userID)
       // this.rootPage = TabsPage;
       this.rootPage = TabsPage;
      else this.rootPage = LoginPage;


      this.deeplinks.route({
        '/rezolve/authservice/sharingInApp':ShareddisputePage ,
        }).subscribe(match => {
        let userID = localStorage.getItem('id');
        var id=match.$args.dispid
       console.log(localStorage.getItem('is_remember') , userID)
           
        if (localStorage.getItem('is_remember') && userID)
         {
          // alert(JSON.stringify(match.$args.id))
           
          this.nav.push(ShareddisputePage,{disputeid:id});
        }
        else {
          this.nav.push(LoginPage,{disputeid:id});
             
        }
           
         
      }, nomatch => {
        //JSON.stringify(nomatch.$link)
        //alert('Got a deeplink that didn\'t match'+JSON.stringify(nomatch));
      });
    });
  }


  showLoading() {
    this.loader = this.loadingController.create({content: 'Please wait...'});
    this.loader.present();
  }

  goONaccount(){
      this.nav.push(AccountPage);
  }

  hideLoading() {
    this.loader.dismiss()
  }
  ionViewWillEnter(){
  this.keyboard.hideKeyboardAccessoryBar(false);

}
  showExpireAlert() {
    let alert = this.alertCtrl.create({
      title: 'Membership',
      subTitle: 'Your membership plan is expired please renew membership for further use.',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
  //~ openPage(page) {
  //~ // Reset the content nav to have just this page
  //~ // we wouldn't want the back button to show in this scenario
  //~ if (page.title == "LogOut") {
  //~ localStorage.clear();
  //~ this.nav.setRoot(LoginPage);

  //~ } else
  //~ this.nav.setRoot(page.component);
  //~ }

  openPage(page) {
    if (page.component) {
      this.nav.push(page.component);
    } else if(page.title=='Logout') {
      localStorage.clear();
      this.nav.setRoot(LoginPage)
      // this.app.getRootNavs()[0].setRoot(LoginPage);

    }

  }


  //~ checkuserexit(){
  //~ if(localStorage.getItem('userData')){

  //~ this.http.get('http://ondemandhome.betaplanets.com/Webservice/checkUserExist?userid='+JSON.parse(localStorage.getItem("userData"))[0].id).map(res => res.json()).subscribe(data => {
  //~ if(data == false){
  //~ let toast = this.toastCtrl.create({
  //~ message: 'Admin has deleted your account.',
  //~ duration: 3000,
  //~ position: 'bottom'
  //~ });
  //~ toast.present(toast);
  //~ localStorage.setItem('emailuserData', '');
  //~ localStorage.setItem('userData', '');
  //~ this.rootPage = LoginPage;
  //~ }
  //~ });
  //~ }
  //~ else{
  //~ this.rootPage = LoginPage;
  //~ }
  //~ }
}

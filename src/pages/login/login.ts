import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController,LoadingController, MenuController,Events ,NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FCM } from '@ionic-native/fcm';
import { ShareddisputePage } from '../shareddispute/shareddispute'
import {ForgetPasswordPage } from "../forget-password/forget-password"
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  passwordcontroler: AbstractControl;
  emailcontroler: AbstractControl;
  formremember: AbstractControl;
  formgroup: FormGroup;
  loader: any;
  myToken : any ;
  isselect=true;

  constructor(public http: HttpClient,public formbuilder: FormBuilder,public toastController: ToastController,public navCtrl :NavController,private loadingController: LoadingController,private fcm: FCM,private menu: MenuController,public events: Events,private navParam:NavParams) {
    this.gettoken();
    this.initFormGroup();
     this.menu.swipeEnable(false);
     console.log(this.isselect)
  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      passwordcontroler: ['', Validators.required],
      emailcontroler: ['', Validators.required],
      formremember: [true,'']

    });
    this.passwordcontroler = this.formgroup.controls['passwordcontroler'];
    this.emailcontroler = this.formgroup.controls['emailcontroler'];
    this.formremember = this.formgroup.controls['formremember'];

  }

  onSignup() {
    this.navCtrl.push(RegisterPage);
  }
  gettoken(){
    this.fcm.getToken().then(token => {
      this.myToken = token ;  
     // alert(this.myToken);
    });
  }

  StoreToken(id){
    this.fcm.getToken().then(token => {
      this.myToken = token ; 
     // alert("token crated successfullu : "+token)
      /*********** */
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/addUserToken?userid='+id+'&token='+token).subscribe(res =>  {
      if(res){
        this.hideLoading();
          this.presentToastWithOptions('Login Successful');
          var disputeid=this.navParam.get('disputeid')
          if(disputeid){
            this.navCtrl.push(ShareddisputePage,{disputeid:disputeid});
          }else{
            this.navCtrl.setRoot(TabsPage);
          // this.nav.setRoot(TabsPage,{index:1});
          }
          //this.navCtrl.setRoot(TabsPage);
      }
      else{
        this.hideLoading();
      this.presentToastWithOptions("Please enter valid credentials.")
      }
    }, (err) => {
         this.hideLoading();
      this.presentToastWithOptions("Please enter valid credentials.")
    });
//********** */
}).catch(errs=>{
  alert(JSON.stringify(errs))

  this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/addUserToken?userid='+id+'&token='+null).subscribe(res =>  {
    if(res){
      this.hideLoading();
        this.presentToastWithOptions('Login Successful');
        var disputeid=this.navParam.get('disputeid')
        if(disputeid){
          this.navCtrl.push(ShareddisputePage,{disputeid:disputeid});
        }else{
          this.navCtrl.setRoot(TabsPage);
        }
        //this.navCtrl.setRoot(TabsPage);
    }
    else{
      this.hideLoading();
    this.presentToastWithOptions("Please enter valid credentials.")
    }
  }, (err) => {
       this.hideLoading();
    this.presentToastWithOptions("Please enter valid credentials.")
  });
});
  }

  login(data)
  {
    // this.navCtrl.setRoot(TabsPage);
    this.showLoading();
    
    console.log( data.formremember+" "+JSON.stringify(data));
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/signin?email='+data.emailcontroler+'&password='+data.passwordcontroler).subscribe(res =>  {
      console.log("userdata",res);
      var responce:any=res
     if(responce.status==false){
      this.hideLoading();
      alert(responce.result)
     }
     else if(res)
      { //var isremember=data.formremember
        // if(!this.isselect){
          console.log("in if");
          localStorage.setItem('id', res[0].id) ;
          localStorage.setItem('userimage', res[0].photo) ;
          localStorage.setItem('username',res[0].username) ;
          this.events.publish('user:created', res[0].photo, res[0].username);
          // localStorage.setItem('is_remember', data.formremember) ;
          var  formremember:any=true
          localStorage.setItem('is_remember','true') ;
           
          this.StoreToken(res[0].id);
        // }
        // else{
        //   console.log("in else");
        //   localStorage.setItem('id', res[0].id) ;
        //   localStorage.setItem('userimage', res[0].photo) ;
        //   localStorage.setItem('username',res[0].username) ;
        //   this.events.publish('user:created', res[0].photo, res[0].username);
        //   this.StoreToken(res[0].id);
        // }
      }
      else
      {
         this.hideLoading();
        this.presentToastWithOptions('Email & password wrong');

      }


    }, (err) => {
      console.log(err);
          this.hideLoading();
      this.presentToastWithOptions("Please enter valid credentials.")
    });

  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess ,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

  onForgot() {
    this.navCtrl.push(ForgetPasswordPage);
  }

   async showLoading() {
    this.loader = await this.loadingController.create({content: 'Loading...'});
    return await this.loader.present();

  }

  hideLoading() {
    this.loader.dismiss();
  }

   toggle(){
    this.isselect=!this.isselect;
  }
}

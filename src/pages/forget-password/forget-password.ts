import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController ,Loading} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {LoginPage } from "../login/login"
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage  {

  oldpass: AbstractControl;
  // newpass: AbstractControl;
  // cnewpass: AbstractControl;
  formgroup: FormGroup;
  value = false ;
  userId : any ;
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public loadingCtrl: LoadingController, public toastCtrl: ToastController,public http:HttpClient) {

  }

  ngOnInit() {
  }
  sendEmail(form){
    this.presentLoadingDefault();
    console.log(form.value.email)
    var data=form.value.email
    this.http.get("http://rezolve.betaplanets.com/rezolve/authservice/forgetpassword?email="+form.value.email).subscribe(res=>{
    var responce:any=res; 
    console.log(res)
    this.loading.dismiss()

if(res==true){
    //console.log(responce[0].msg)
    this.navCtrl.push(LoginPage)
    this.presentToast("Please check email")
  }else{
    this.presentToast("This email is not Registered")
  }
   
    //   console.log('response',res)
    //   this.toasterService.presentToast('Please Check Your Email')
    //   this.router.navigateByUrl('');

    },error=>{
      this.loading.dismiss()

      alert(JSON.stringify(error))
    })
  }
  goToLoginPage(){
    this.navCtrl.push(LoginPage)
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'center'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      enableBackdropDismiss:true
    });
  
    this.loading.present();
 
  }
  
  
}

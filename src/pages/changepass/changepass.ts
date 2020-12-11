import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController ,Loading} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from '@angular/common/http';
import {AccountPage} from '../../pages/account/account';

/**
 * Generated class for the ChangepassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-changepass',
  templateUrl: 'changepass.html',
})
export class ChangepassPage {

  oldpass: AbstractControl;
  newpass: AbstractControl;
  cnewpass: AbstractControl;
  formgroup: FormGroup;
  value = false ;
  loading: Loading;
  userId : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public loadingCtrl: LoadingController, public toastCtrl: ToastController,public http:HttpClient) {
    this.userId =localStorage.getItem('id');

  	this.initFormGroup();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassPage');
  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      newpass: ['', Validators.required],
      cnewpass: ['', Validators.required],
      oldpass: [''],

    });
    this.newpass = this.formgroup.controls['newpass'];
    this.cnewpass = this.formgroup.controls['cnewpass'];
    this.oldpass = this.formgroup.controls['oldpass'];


  }

   getCpass(ev: any) {
    if(ev.target.value !== this.newpass.value){
    	this.value = true ;
    }else{
    	this.value = false ;

    }
    
  }

  changepassword(data){
  	this.showLoading();
  	this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/changeNewPassword?userid='+this.userId+'&oldpassword='+data.oldpass+'&newpassword='+data.newpass).subscribe(res => {
   		if(res){
   			this.hideLoading();
   			this.navCtrl.setRoot(AccountPage);
   			this.presentToast("password successfully changed");
   		}
   		/*else{
   			this.hideLoading();
   			this.navCtrl.push(AccountPage);
   			this.presentToast("Old Password Not Matched");
   		}*/

    }, (err) => {
   		this.hideLoading();
   		this.navCtrl.setRoot(AccountPage);
   		this.presentToast("Old Password Not Matched");

    });

  }

   presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({content: 'Loading...'});
    return await this.loading.present();

  }

  hideLoading() {
    this.loading.dismiss();
  }

}

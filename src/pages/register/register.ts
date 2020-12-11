import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController,AlertController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  confirm_pass: AbstractControl;
  mpassword: AbstractControl;
  confirmpassword: AbstractControl;
  value = false;
  email: AbstractControl;
  name: AbstractControl;
  firstname: AbstractControl;
  lastname: AbstractControl;
  formgroup: FormGroup;

  constructor(public navCtrl: NavController,public alertCtrl:AlertController,  public formbuilder: FormBuilder, public navParams: NavParams, public http: HttpClient, public toastController: ToastController) {
    this.initFormGroup()

  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      confirm_pass: ['', Validators.required],
      mpassword: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
     lastname: ['', Validators.required],

    });
    this.confirm_pass = this.formgroup.controls['confirm_pass'];
    this.mpassword = this.formgroup.controls['mpassword'];
    this.email = this.formgroup.controls['email'];
    this.name = this.formgroup.controls['name'];
    this.firstname = this.formgroup.controls['firstname'];
   this.lastname = this.formgroup.controls['lastname'];
        
   
  }

  getItems(ev: any) {
    this.mpassword = ev.target.value;
  }

  getCpass(ev: any) {
    console.log(" ev.target.value "+this.mpassword.value+ " "+ev.target.value);
    this.value = ev.target.value !== this.mpassword.value;
  }

  onSignup() {
    this.navCtrl.push(LoginPage);
  }

  

  register(data) {
    // console.log('http://rezolve.betaplanets.com/rezolve/authservice/signup?username='+ data.name +'&mobile=' + data.contact + '&email=' + data.email + '&password=' + data.mpassword);
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/signup?username='+ data.name +'&mobile=' + data.contact + '&email=' + data.email + '&password=' + data.mpassword+'&firstname='+ data.firstname+'&lastname='+ data.lastname).subscribe(res => {
      if (res) {
        console.log(res)
        this.presentToastWithOptions('Registration Successful. Please Check Email.');
        this.navCtrl.push(LoginPage);
      } else {
        console.log('login responce',)
        let msg='Email Already Exists'
         this.alert(msg);
        //this.presentToastWithOptions('this email id is already registered');
      }
    }, (err) => {
      console.log(err);
       if(err.error.text)
         this.alert(err.error.text);
       else{
         this.alert('Network Problem !')
       }
      //this.presentToastWithOptions("Some error occur in register err.")

    });
  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'bottom',
      duration: 5000
    });
    toast.present();
  }

   alert(msg){
   this.alertCtrl.create({
    title: 'Registration Error',
    subTitle: msg,
    buttons: ['Dismiss']
  }).present();
   }



  /*onTerm_condition() {
    this.presentToastWithOptions("We are working")
  }*/
}

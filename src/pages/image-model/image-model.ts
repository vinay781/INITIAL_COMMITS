import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ViewController} from 'ionic-angular';

/**
 * Generated class for the ImageModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-model',
  templateUrl: 'image-model.html',
})
export class ImageModelPage {
  img:any;
  showControls: boolean = false;
  scale:any=1;
  loaded:boolean=false
  loadingAnimation = "assets/changepass.png";

  constructor(public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
  
   this.img=this.navParams.get("img")
   console.log(this.img)
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageModelPage');
  }
 

}

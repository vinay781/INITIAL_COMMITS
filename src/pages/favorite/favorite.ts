import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,Events } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { FavserviceProvider } from '../../providers/favservice/favservice';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  message : any ;
	public loader: any;
	public disputes_data : any ;
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,private loadingController: LoadingController,private alertCtrl: AlertController,private favservice: FavserviceProvider,public events:Events) {

  	this.showLoading();
  	this.getfavoritedisputes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  getfavoritedisputes()
  {
  	 this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/getFavById?userid='+localStorage.getItem('id')).subscribe(res => {
      console.log(res);
      this.disputes_data = res;
      this.events.publish('disputechange');

      this.disputes_data.reverse();
      this.hideLoading()
    }, (err) => {
      console.log("erro",err);
      this.disputes_data=null;
      this.message="You don't have any items in this section";
      this.hideLoading()
    });
  }

  removetofavorite(id){
  	this.showLoading();
    this.favservice.removetofavelist(id).then((result) =>{
      if(result){
      this.hideLoading();
      this.getfavoritedisputes();
      }
     }, (err) => {
      this.hideLoading();
      console.log(err);
        });
  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Please Wait...'});
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss()
  }
    getTimePassed(totalTime) {
    let time =Math.round(totalTime*0.041667);
    if(time >=1)
      return time +' day ago';
    else  return totalTime +' hr ago';
  }
    showWorkingAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
  }

}

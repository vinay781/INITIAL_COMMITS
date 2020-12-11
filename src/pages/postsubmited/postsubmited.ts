import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Nav } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {TabsPage} from '../../pages/tabs/tabs';
import {MydisputePage} from "../mydispute/mydispute";

/**
 * Generated class for the PostsubmitedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-postsubmited',
  templateUrl: 'postsubmited.html',
})
export class PostsubmitedPage {

	dispute_data: any={photo:""};
	disputeId : any ;
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';

  constructor(public navCtrl: NavController,public nav: Nav, public navParams: NavParams,public http :HttpClient,public app:App) {

  		this.disputeId=this.navParams.get('disid');
  		console.log("getdisputeid",this.disputeId);
  	  
  	   this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/disputesByid?dispid=' + this.disputeId).subscribe(res => {

      	 this.dispute_data = res[0];
   		console.log("getdisputedetails",this.dispute_data);

 
    }, (err) => {
      console.log(err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsubmitedPage');
  }

    mydisputepage(){
    this.app.getRootNav().push(MydisputePage); 

  }
   addNewpage(){
     localStorage.setItem('back','2');

    this.nav.push(TabsPage,{indexof:'2'});
     //this.nav.push(TabsPage,{index:'2'});

   }
   Rezolvepage(){
     localStorage.setItem('back','1');
 		this.nav.push(TabsPage,{indexof:'3'});
     //this.nav.push(TabsPage,{index:'3'});
   	
   }
   public  previosPage() {

    this.nav.setRoot(TabsPage);
  
  }

}

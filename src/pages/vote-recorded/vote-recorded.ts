import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from '../../pages/tabs/tabs';
import {DisputePage} from '../../pages/dispute/dispute';
import {StaticsPage} from "../../pages/statics/statics";


/**
 * Generated class for the VoteRecordedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-vote-recorded',
  templateUrl: 'vote-recorded.html',
})
export class VoteRecordedPage {
  vote_value= 1;
  fromtab = false ;
  disputedata : any ;


  constructor(public navCtrl: NavController,
              private alertCtrl:AlertController ,
              private app:App ,
              public navParams: NavParams) {
 // this.showWorkingAlert()
   if(navParams.get('fromtab')){
     this.fromtab =true ;
   }
   this.disputedata=this.navParams.get('disputedata');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VoteRecordedPage');
  }

  /*radiovalue(result) {
    console.log(result);
    if(result){
      this.vote_value=1;
    }
    else{
      this.vote_value=0;
    }
  }*/

  /*showWorkingAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
  }*/
  Rezolvedispute(){
     localStorage.setItem('back',"1")
     console.log(localStorage.getItem('back'),'value of back')
     this.navCtrl.push(TabsPage,{indexof:'3'});

  }
  viewresult(){
     this.navCtrl.push(StaticsPage,{'DisputeObj':this.disputedata});
     // alert(this.disputeID);
   }
  /*onSubmit() {
    // alert(this.vote_value);
    if(this.vote_value){
     // this.navCtrl.setRoot(AddNewPage);
     if(!this.fromtab){
     this.navCtrl.push(TabsPage,{indexof:'2'});
     }
     else{
         this.navCtrl.push(TabsPage,{indexof:'2'});  
     }

    }
    else{
     // this.navCtrl.push(DisputePage);
     this.navCtrl.push(TabsPage,{indexof:'3'});
     
    }
  }*/
}

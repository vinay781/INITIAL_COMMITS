import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,AlertController, MenuController, Nav, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { FavserviceProvider } from '../../providers/favservice/favservice';
import {VotePage} from "../vote/vote";
import { SocialSharing } from '@ionic-native/social-sharing';
import {TabsPage} from "../tabs/tabs"
import { VoteRecordedPage} from "../vote-recorded/vote-recorded"
/**
 * Generated class for the ShareddisputePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-shareddispute',
  templateUrl: 'shareddispute.html',
})
export class ShareddisputePage {
  data:any=[];
  loader:any;
  userId:any;
  alert:any;
  disputedatafound:boolean=false
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
 attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';
 constructor(public nav: NavController, public navParams: NavParams, public http: HttpClient,private favservice: FavserviceProvider, private loadingController: LoadingController,private alertCtrl:AlertController,private toastCtrl:ToastController,public socialSharing :SocialSharing) {
   this.showLoading();
   this.getdispute();
}
getdispute(){
   var disputeid=this.navParams.get('disputeid')
  //var disputeid=275
   var userid=localStorage.getItem('id');
   console.log('dispute id',disputeid)
   this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/disputeDestailsById?disp_id='+disputeid+'&userid='+userid).subscribe(res => {
     this.disputedatafound=true
      this.data=res;
      this.data=this.data[0]
      this.hideLoading();
      console.log(this.data)
 },error=>{
   this.disputedatafound=false;
   this.nav.push(TabsPage); 
  })
}
 ionViewDidLoad() {
   console.log('ionViewDidLoad ShareddisputePage');
 }

 getTimePassed(totalTime,date) {
   // let time =Math.round(totalTime*0.041667);
   let hours =Math.round(totalTime/60);
 // console.log("time",time);
 if(hours >=1 && hours<=24){
   return hours +'hr ago';
 }
 else if(hours>=16 && hours<=48){
   return "Yesterday" ;
 }
 else if(hours>=48){
   return date ;
 }
 else
 {
   return totalTime +'min ago';
 }
  
}
 showLoading() {
   this.loader = this.loadingController.create({content: 'Please Wait...',
 duration: 3000
 
});
   this.loader.present();
 }

 hideLoading() {
   this.loader.dismiss()
 }
 private presentToast(text) {
   let toast = this.toastCtrl.create({
     message: text,
     duration: 3000,
     position: 'bottom'
   });
   toast.present();
 }

 sharedispute(id){
   console.log(id)
   this.socialSharing.share('','','','https://rezolve.betaplanets.com/rezolve/authservice/sharingInApp?dispid='+id).then((res) => {
     console.log('send notificaton success')
   }).catch((error) => {
     alert(error)
   });
 }
 addToFave(obj) {
   //this.showWorkingAlert()
   // console.log(localStorage.getItem('id'));
   this.showLoading();
   this.favservice.addtofavelist(obj).then((result) =>{
     if(result){
       this.getdispute()
     this.hideLoading();

     }
    }, (err) => {
     this.hideLoading();
     console.log(err);
       });
 }
 removetofav(disputeid){
   this.showLoading();
   this.favservice.removetofavelist(disputeid).then((result) =>{
     if(result){
       this.getdispute()
     this.hideLoading();
     }
    }, (err) => {
     this.hideLoading();
     console.log(err);
       });
 }
  previosPage() {
        this.nav.setRoot(TabsPage,{index:1});
 }
 
 goforvote(dipute) {
   console.log("dispute detail for vote",dipute);
   // this.menuCtrl.enable(false);
   console.log(dipute.isvote);
   this.checkForVote(dipute.disputeid,dipute.disp_userid,dipute);

   //else  this.nav.push(VotePage, {'id': dipute.disputeid})


   //  this.router.navigate(["tabs/vote",{ id: diputeid }]);
 }

 checkForVote(disputeId,disputeUserId,data) {
   this.showLoading();
   let userId = localStorage.getItem('id');
   this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/voteDispute?user_id='
     + userId + '&dispute_id=' + disputeId).subscribe((res: any) => {
     if (res.vote !== 'No') {
       if(disputeUserId===this.userId){
         let msg="You Cannot Vote On Your Own Dispute." 
         this.alert(msg);
         
          //this.nav.push(VoteRecordedPage, {'id': disputeId,'disputedata':data});
       }else{

       this.nav.push(VotePage, {'id': disputeId,'disputeuser':disputeUserId,'disputedata':data})
       }
     } else this.nav.push(VoteRecordedPage, {'id': disputeId,'disputedata':data});

     this.hideLoading()
   }, (error) => {
     this.hideLoading();
     this.presentToast("Some error occur.")
   })
 }
 

}

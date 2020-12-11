import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {AlertController, LoadingController, MenuController, Nav, ToastController,Content,ModalController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {VotePage} from "../vote/vote";
import {VoteRecordedPage} from "../vote-recorded/vote-recorded";
import { FavserviceProvider } from '../../providers/favservice/favservice';
import { SocialSharing } from '@ionic-native/social-sharing';
import {TabsPage} from '../../pages/tabs/tabs';
//import { ImageViewerController } from "ionic-img-viewer";
//import { PhotoViewer } from '@ionic-native/photo-viewer';
import { FilePath } from '@ionic-native/file-path';
import {ImageModelPage} from "../image-model/image-model"
/**
 * Generated class for the UserDisputesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-user-disputes',
  templateUrl: 'user-disputes.html',
})
export class UserDisputesPage {
  @ViewChild(Content) content: Content;
    public loader: any;
  disputes_data: any = [];
  data: any = [];
  //items=[];
  category: any = [];
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';
 userId:any ;
 disputeUser_id:any;

  constructor(public nav: Nav, public http: HttpClient, private alertCtrl: AlertController, private loadingController: LoadingController, public menuCtrl: MenuController, private toastCtrl: ToastController,private favservice: FavserviceProvider,public socialSharing :SocialSharing,public modalCtrl:ModalController,public navParm:NavParams
    ///public imageViewerCtrl: ImageViewerController//,private photoViewer: PhotoViewer 
    ) {
    this.initCategory();
     this.userId= localStorage.getItem('id') ;
     this.disputeUser_id = navParm.get('disputeuser');
     console.log("this.disputeUser_id",this.disputeUser_id)
  }

  private initCategory() {
    this.showLoading();
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/categories').subscribe(res => {
      console.log("categories",res);
      this.hideLoading();
      if (res) {
        this.category = res;
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  ionViewWillEnter() {

    console.log('willenter');
    this.getallDisputes();
    this.isReadNotification();
  }
  viewWillAppear(){
        console.log('viewWillAppear');

  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave')
    localStorage.removeItem('back')
  }

  getallDisputes(){
    this.disputeUser_id = this.navParm.get('disputeuser');
    console.log("this.disputeUser_id",this.disputeUser_id)
      this.http.get('https://rezolve.betaplanets.com/rezolve/Authservice/getDisputesOneByOtherUser?userid='+this.userId+'&id='+this.disputeUser_id).subscribe(res => {
      console.log(res);
      if (res) {
        //this.content.scrollToTop();
        console.log("UserDisputesPage",res)
        this.disputes_data = res;
        this.data = res;
        this.disputes_data.reverse();
      }
    }, (err) => {
      console.log(err);
    });
  }

  isReadNotification(){
      this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/updateReadStatus?disp_userid='+localStorage.getItem('id')).subscribe(res => {
      console.log(res);
    
    }, (err) => {
      
    });

  }

  filterList(category:any) {
      this.showLoading();
    if(category=='All'){
      this.disputes_data=this.data;
    }else {
        this.disputes_data = this.data.filter((data) => {
        return data.category == category
      });
   
         }
        
  }

  showWorkingAlert() {
    
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
  }

  goforvote(dipute) {
    console.log("dispute detail for vote",dipute);
   this.disputeUser_id=dipute.disp_userid
    console.log(dipute.disp_userid);
    this.checkForVote(dipute.disputeid,dipute.disp_userid,dipute);

  }

  checkForVote(disputeId,disputeUserId,data) {
    this.showLoading();
    let userId = localStorage.getItem('id');
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/voteDispute?user_id='
      + userId + '&dispute_id=' + disputeId).subscribe((res: any) => {
      if (res.vote !== 'No') {
        if(disputeUserId===this.userId){
          let msg="You cannot vote on your own dispute." 
          this.alert(msg);
        
        }else{
          console.log("disputeUserId",disputeUserId)
        this.nav.push(VotePage, {'id': disputeId,'disputeuser':this.disputeUser_id,'disputedata':data})
        }
      } else this.nav.push(VoteRecordedPage, {'id': disputeId,'disputedata':data});

      this.hideLoading()
    }, (error) => {
      this.hideLoading();
      this.presentToast("Some error occur.")
    })
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

  getItems($event: UIEvent) {

  }

  onCategorySelect(cate: any) {
    console.log("value " + cate);
    this.filterList(cate)

  }


  addToFave(obj) {
    console.log(obj)
    //this.showWorkingAlert()
    // console.log(localStorage.getItem('id'));
    this.showLoading();
    this.favservice.addtofavelist(obj).then((result) =>{
      if(result){
        console.log(result)
      this.hideLoading();
      this.getallDisputes();

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
      this.hideLoading();
      this.getallDisputes();
      }
     }, (err) => {
      this.hideLoading();
      console.log(err);
        });
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

  sharedispute(id){
    console.log(id)
    this.socialSharing.share('Who do you think is right?','','','https://rezolve.betaplanets.com/rezolve/authservice/sharingInApp?dispid='+id).then((res) => {
      console.log('send notificaton success')
    }).catch((error) => {
      alert(error)
    });
  }
  public previosPage() {
    var back=localStorage.getItem('back')
    console.log(back,"value of back")
    if(back=='1'){
      this.nav.pop();
       console.log(back,"value of back")
      localStorage.removeItem('back')
    }else{
      this.nav.setRoot(TabsPage);
      localStorage.removeItem('back')
    }
    
   
  }
  alert(msg){
   this.alertCtrl.create({
    title: 'Vote',
    subTitle: msg,
    buttons: ['Ok']
  }).present();
   }
  showimg(filename){
   const option={
    cssClass:'img-modal'
   }
 console.log(filename)
 let imageViewer = this.modalCtrl.create(ImageModelPage, {img:filename},option);
 imageViewer.present();

}

}

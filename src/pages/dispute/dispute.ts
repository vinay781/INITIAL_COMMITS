import {Component,ViewChild} from '@angular/core';
import {AlertController, LoadingController, MenuController, Nav, ToastController,Content,ModalController,Events} from 'ionic-angular';
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
@Component({
  selector: 'page-dispute',
  templateUrl: 'dispute.html'
})
export class DisputePage {
   @ViewChild(Content) content: Content;
    public loader: any;
  disputes_data: any = [];
  data: any = [];
  //items=[];
  category: any = [];
  // oldLength:number=0;
  selectedCategory:any="All"
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';
 userId:any ;


  constructor(public nav: Nav, public http: HttpClient, private alertCtrl: AlertController, private loadingController: LoadingController, public menuCtrl: MenuController, private toastCtrl: ToastController,private favservice: FavserviceProvider,public socialSharing :SocialSharing,public modalCtrl:ModalController,public events:Events
    ///public imageViewerCtrl: ImageViewerController//,private photoViewer: PhotoViewer 
    ) {
    this.initCategory();
        this.getallDisputes();
        //disputechange
     this.userId= localStorage.getItem('id') ;
     this.events.subscribe('disputechange', () => {
      console.log('Welcome');
      this.getallDisputes();
    });   
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
      this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/getAllDisputes?userid='+localStorage.getItem('id')).subscribe(res => {
      //console.log(res);
      if (res) {
        this.hideLoading();
        this.data = res;
        this.data.reverse();
        this.disputes_data=this.data
 this.filterList(this.selectedCategory)
     console.log(this.disputes_data)
    
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
    //this.showLoading();
    if(category=='All'){
      this.disputes_data=this.data;
     

    }else {
      //this.items=[]
      this.disputes_data = this.data.filter((data) => {
        return data.category == category
      });
      }
   
  }

  showWorkingAlert() {
      //this.content.scrollToTop();
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
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
    //this.showLoading();
    let userId = localStorage.getItem('id');
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/voteDispute?user_id='
      + userId + '&dispute_id=' + disputeId).subscribe((res: any) => {
      if (res.vote !== 'No') {
        if(disputeUserId===this.userId){
          let msg="You can not vote to your own created dispute." 
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
    this.selectedCategory=cate;
    this.filterList(cate)

  }


  addToFave(obj,index) {
    //this.showWorkingAlert()
    // console.log(localStorage.getItem('id'));
 //   this.showLoading();
    this.favservice.addtofavelist(obj).then((result) =>{
      if(result){
      this.disputes_data[index].isfav=1;
     // console.log(this.disputes_data)
  
      this.hideLoading();
      this.getallDisputes();

      }
     }, (err) => {
      this.hideLoading();
      console.log(err);
        });
  }
  removetofav(disputeid,index){
  //  this.showLoading();
    this.favservice.removetofavelist(disputeid).then((result) =>{
      if(result){
        this.disputes_data[index].isfav=0;
    //    console.log(this.disputes_data)
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
     // console.log("time pass",hours);
    // console.log("total time",totalTime);
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
    cssClass:'img-modal',
    showBackdrop:true,
   }
 console.log(filename)
 let imageViewer = this.modalCtrl.create(ImageModelPage, {img:filename},option);
 imageViewer.present();

}
// doInfinite(infiniteScroll) {
//   console.log('Begin async operation');

//     if(this.data.length-this.disputes_data.length>20)
//     {
//       for (let i = 0; i <20; i++) {
//       this.disputes_data.push(this.data[this.disputes_data.length]);
//     }}else{
//       for (let i = 0; i <this.data.length-this.disputes_data.length; i++) {
//         this.disputes_data.push(this.data[this.disputes_data.length]);
//       }
//     }

//     console.log('Async operation has ended');
//     infiniteScroll.complete();
// }
}

import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StaticsPage} from "../statics/statics";
import { FavserviceProvider } from '../../providers/favservice/favservice';
import { SocialSharing } from '@ionic-native/social-sharing';


//@IonicPage()
@Component({
  selector: 'page-mydispute',
  templateUrl: 'mydispute.html',
})
export class MydisputePage {
  public loader: any;
  disputes_data: any;
  all_disputes_data: any;
  selectedIndex = -1;
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';
    category: any;

  constructor(public navCtrl: NavController,
              private loadingController: LoadingController,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient,public favservice: FavserviceProvider,public socialSharing :SocialSharing) {
    this.getUserDisputes();
    this.initCategory();
  }

    initCategory() {
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/categories').subscribe(res => {
      this.hideLoading();
      if (res) {
        this.category = res;
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  getUserDisputes(){
      let userId = localStorage.getItem('id');
    this.showLoading();
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/getDisputes?userid=' + userId).subscribe(res => {
      console.log(res);
      this.disputes_data = res;
      this.disputes_data.reverse();
      this.all_disputes_data=res;
      console.log(this.all_disputes_data)
      this.hideLoading()
    }, (err) => {
      console.log(err);
      this.hideLoading()
    });
  }

  addToFave(obj) {
    //this.showWorkingAlert()
    // console.log(localStorage.getItem('id'));
    this.showLoading();
    this.favservice.addtofavelist(obj).then((result) =>{
      if(result){
      this.hideLoading();
      this.getUserDisputes();
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
     this.getUserDisputes();
      }
     }, (err) => {
      this.hideLoading();
      console.log(err);
        });
  }

  showWorkingAlert() {
    let alert = this.alertCtrl.create({
      title: 'Update',
      subTitle: 'Currently work in progress for this',
      buttons: ['Dismiss']
    });
    alert.present()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MydisputePage');
  }

  goToStatics(dispute: any) {
    this.navCtrl.push(StaticsPage, {'DisputeObj': dispute})
  }

  showLoading() {
    this.loader = this.loadingController.create({content: 'Please Wait...'});
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss()
  }

  getItems(event) {
    // set val to the value of the ev target
    var val = event.target.value;
    // if the value is an empty string don't filter the items 
    if (val && val.trim() != '') {
      this.disputes_data = this.all_disputes_data.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toString().toLowerCase()) > -1);
      })
    }else  this.disputes_data=this.all_disputes_data

  }

  getTimePassed(totalTime,date) {
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

  showPopupMenu() {
    console.log("on click");
    let alert = this.alertCtrl.create();
    alert.setTitle('Sort By :');
    alert.addInput({type: 'radio', label: 'Date', value: 'date', checked: this.selectedIndex == 0});
    alert.addInput({type: 'radio', label: 'Title', value: 'title', checked: this.selectedIndex == 1});
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log('Checkbox data:', data);
        if (data == 'title') {
          console.log('Checkbox data: in if', data);
          this.selectedIndex = 1;
             this.disputes_data = this.disputes_data.sort((a, b) => {
            return a.title.toLowerCase() > b.title.toLowerCase() ? 1:-1;
          });
          //  this.disputes_data=this.disputes_data.filter((data)=> data.title);
        } else {
          this.selectedIndex = 0;
          this.disputes_data = this.disputes_data.sort((b, a) => {
            return a.date.toLowerCase() > b.date.toLowerCase() ? 1:-1;
          });
        }
        alert.dismiss();
        return false;
      }
    });

    alert.present();
    /*  let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
          ev: myEvent
        });
     */
  }

  sortTypeTitle(): boolean {
    return this.selectedIndex == 1;
  }

  onCancel(event: UIEvent) {
    console.log("on cancel");
    this.disputes_data=this.all_disputes_data;
  }

   sharedispute(){
    this.socialSharing.share('','','','').then((res) => {
      alert();
    }).catch((error) => {
      alert(error)
    });
  }


  filterList(category) {
    if(category=='All'){
      this.disputes_data=this.all_disputes_data;
    }else {
      this.disputes_data = this.all_disputes_data.filter((data) => {
        return data.category == category
      });
    }
  }

   onCategorySelect(cate: any) {
    console.log("value " + cate);
    this.filterList(cate)

  }

}

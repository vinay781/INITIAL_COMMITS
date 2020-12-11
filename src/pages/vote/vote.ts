import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {TabsPage} from "../tabs/tabs";
import {StaticsPage} from "../statics/statics";
import {VoteRecordedPage} from "../../pages/vote-recorded/vote-recorded";
import {UserDisputesPage} from "../user-disputes/user-disputes"
//@IonicPage()
@Component({
  selector: 'page-vote',
  templateUrl: 'vote.html',
})
export class VotePage {
  dispute_data: any={photo:""};
  dispute_id: any;
  vote_value: any;
  disputeUser_id : any ;
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  attechmentBaseUrl = 'http://rezolve.betaplanets.com/rezolve/assets/attachment/';

  fromtabs = false ;
  disputedata : any ;

  constructor(public http: HttpClient,
              public toastController: ToastController,
              public navPrm: NavParams,
              public navCtr: NavController,
  ) {
    this.dispute_id = navPrm.get('id');
    this.disputeUser_id = navPrm.get('disputeuser');
    this.disputedata = navPrm.get('disputedata');
    console.log('diptedata',this.disputedata)
    if(navPrm.get('fromtab')){
      console.log("fromtab");
      this.fromtabs = true ;
    }
    console.log('disputeuser',this.disputeUser_id);
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/disputesByid?dispid=' + this.dispute_id).subscribe(res => {
      console.log('Data '+"id "+this.dispute_id+"\n"+JSON.stringify(res));
      if(res)
        this.dispute_data = res[0];
        console.log(this.dispute_data)
    }, (err) => {
      console.log(err);
    });

  }


  radiovalue(result) {
    console.log(result);
    this.vote_value = result;
  }

  votedispute(res) {

    let userId=localStorage.getItem('id');
    console.log(userId+" "+this.dispute_id);
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/electionById?disp_userid='+this.disputeUser_id+'&user_id='+userId+'&disp_id=' + this.dispute_id + '&decision=' + this.vote_value + '&comment=' + res.comment).subscribe(result => {
      if (result) {
        this.notification(this.disputeUser_id,this.vote_value,res.comment);
       if(!this.fromtabs){
          this.navCtr.setRoot(VoteRecordedPage,{'disputeid':this.dispute_id,'disputedata':this.disputedata});
       } 
       else{
          this.navCtr.push(VoteRecordedPage,{'fromtab':"yes",'disputeid':this.dispute_id,'disputedata':this.disputedata});
       }  
    // this.navCtr.setRoot(StaticsPage, {'DisputeObj': this.dispute_id});
        // this.presentToastWithOptions('Your vote is register');
       /* this.navCtr.pop();
        this.navCtr.setRoot(TabsPage)*/
      } else {
        this.presentToastWithOptions('Something wrong');
      }
    }, (err) => {
      console.log(err);
    });
  }

  notification(disputeUserId,decision,comment){
    this.http.get(' http://rezolve.betaplanets.com/rezolve/authservice/getDeviceToken?disp_userid='+disputeUserId+'&decision='+decision+'&comment='+comment).subscribe(res => {
    }, (err) => {
      console.log(err);
    });
  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
  viewUserDispute(){
    this.disputeUser_id = this.navPrm.get('disputeuser');
    console.log("seconduser",this.disputeUser_id)
    this.navCtr.push(UserDisputesPage, {'disputeuser':this.disputeUser_id})
  }

}

import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams,Content} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {BaseChartDirective} from "ng2-charts";


/**
 * Generated class for the StaticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-statics',
  templateUrl: 'statics.html',
})
export class StaticsPage {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  @ViewChild(Content) content: Content;
  comments = [];
  commlenght: any;
  yescount = 0;
  nocount = 0;
  unsurecount = 0;
  totalcount = 0;
  data: any;
  memeupdate:any;
  yespercentage = 0;
  nopercentage = 0;
  unsurepercentage = 0;
  imgBaseurl = 'http://rezolve.betaplanets.com/rezolve/assets/userprofile/';
  

  clickpercentage: any;
  clickcontant: any;
  /*
      like : any ;
      unlike : any ;
      memelen : any ;*/

  ChartData: any[] = [1, 1, 1];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors: any[] = [{
    backgroundColor: ["#05d587", "#bd363d","#007aff"]
  }];
  public doughnutChartOption: any = {
    cutoutPercentage: 50,
    legend: {
      display: false
   },
   tooltips: {
      enabled: false
   }

  };
  disputeObj: any;
  userId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    // console.log("data" + this.navParams.get("DisputeObj"));
    this.commlenght=0;
    this.disputeObj = this.navParams.get("DisputeObj");
    this.userId = localStorage.getItem("id");
    console.log("disputeonject",this.disputeObj,this.userId);
    this.getpercentage();
    // console.log(JSON.stringify(this.disputeObj));

  }

  ionViewDidLoad() {

  }

  chartvalue(i, j, k) {
    this.ChartData[0] = i;
    this.ChartData[1] = j;
    this.ChartData[2] = k;
    // console.log(this.ChartData);
    console.log("chartvalue ChartData" + this.ChartData);
    this.chart.chart.update();
  }

  getpercentage() {
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/getDisputeChart?disputeid='+this.disputeObj.disputeid+"&userid="+this.userId
    ).subscribe(res => {
      console.log("comments details",res);
      this.data = res;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].decision == "yes") {
          this.yescount++;
          this.totalcount++;
        } else if (this.data[i].decision == "no") {

          this.nocount++;
          this.totalcount++;
        } else {
          this.unsurecount++;
          this.totalcount++;
        }
      }
      console.log(this.yescount, this.nocount,  this.unsurecount)
       this.getcomments();
      this.yespercentage = Math.round(this.yescount / this.totalcount * 100);
      this.nopercentage = Math.round(this.nocount / this.totalcount * 100);
      this.unsurepercentage = Math.round(this.unsurecount / this.totalcount * 100);
      this.chartvalue(this.yescount, this.nocount, this.unsurecount);
      console.log('this.unsurepercentage',this.unsurepercentage,this.yespercentage, this.nopercentage)

    }, (err) => {
      console.log(err);
    });

  }

  getcomments(){
    //this.content.scrollToTop();
      this.comments = [];
       for (var j = 0; j < this.data.length; j++) {
        if (this.data[j].comment) {
          this.comments.push({
            comment: this.data[j].comment,
            username: this.data[j].username,
            image: this.data[j].photo,
            cid: this.data[j].commentid,
            likes: this.data[j].likes,
            unlikes: this.data[j].dislikes,
            memsid: this.data[j].meme_id,
            userid:this.data[j].userid
          });
          this.commlenght = this.comments.length;
          console.log(this.commlenght)
        }
      }
  }

  chartClicked(e: any) {

    //  var idx = e.active[0]['_index'];
    //  if (idx == 0) {
    //    this.clickcontant = "Yes";
    //  }
    //  if (idx == 1) {
    //    this.clickcontant = "No";
    //  }
    //  if (idx == 2) {
    //    this.clickcontant = "Unsure";
    //  }
    //  var value = (e.active[0]['_chart'].config.data.datasets[0].data[idx]);
    //  this.clickpercentage = Math.round(value / this.totalcount * 100);

  }

  private async likeunlike(cid, value,memeid) {
            console.log(cid,value,memeid)
        this.memeupdate= await this.updatedesion(cid)
   this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/memesById?user_id='+this.userId+'&commentid=' + cid + '&is_like=' + value).subscribe(res => {
    console.log(res)  
    if (res) {
       
        this.setvalue();

      }
      // console.log(res);
      /*		this.memelen = res;
            for(var j=0 ; j<this.memelen.length ; j++ )
              {
                  this.like = this.memelen[j].likes;
                  this.unlike = this.memelen[j].dislikes;
              }*/
    }, (err) => {
      console.log(err);
    });
  }

  updatedesion(id){
   this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/removeMemesById?memesid='+id+"&user_id="+this.userId).subscribe(res => {
    console.log(res)  
   if (res) {
       
        this.setvalue();
        return true
      }
     
    }, (err) => {
      console.log(err);
      return false
    });
  }
  
  setvalue(){
    this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/getDisputeChart?disputeid='+this.disputeObj.disputeid+"&userid="+this.userId
    ).subscribe(res => {
      console.log(res);
     
      this.data = res;
      this.getcomments();
    }, (err) => {
      console.log(err);
    });

  }

}

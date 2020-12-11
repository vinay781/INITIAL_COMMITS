import {Component} from '@angular/core';

import {AddNewPage} from '../addnew/addnew';
import {HomePage} from '../home/home';
import {DisputePage} from '../dispute/dispute';
import {MenuController} from "ionic-angular";
import { NavParams,NavController,Nav , Tabs} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab:Tabs;

  tab1Root = HomePage;
  tab2Root = DisputePage;
  tab3Root = AddNewPage;

  indexvalue = 1 ;
  indexofvalue = 1 ;

  constructor(public menuCtrl: MenuController,public NavParams:NavParams,public navCtrl: NavController) {
     
    this.tab = this.navCtrl.parent;

    if(this.NavParams.get("index")){

      this.indexvalue=this.NavParams.get("index")

      if(this.indexvalue==3){

      this.tab.select(3);
      }else if(this.indexvalue==2){
        this.tab.select(2);
         }else{
          this.tab.select(1);
         }

    }else if(this.NavParams.get("indexof")){

      this.indexofvalue=this.NavParams.get("indexof")

    }else{
      this.indexofvalue=1
    }


  }

  showMenu() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle()
    //this.menuToggle.toggle()
  }
}

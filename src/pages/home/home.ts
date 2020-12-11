import { Component } from '@angular/core';
import { IonicPage, NavController,App} from 'ionic-angular';
import {TabsPage} from '../../pages/tabs/tabs';
import {MydisputePage} from "../../pages/mydispute/mydispute";

/**
 * Generated class for the ResolvePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public nav: NavController,public app: App) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResolvePage');
  }
  mydisputepage(){
 		// this.nav.push(MydisputePage);
    this.app.getRootNav().push(MydisputePage); 

  }
   addNewpage(){
     // this.nav.push(AddNewPage,{fromhome:'yes'});
 		// this.app.getRootNav().push(AddNewPage,{fromhome:'yes'});
     this.nav.push(TabsPage,{index:'2'});

   }
   Rezolvepage(){
 		this.nav.push(TabsPage,{index:'3'});
   	
   }
}

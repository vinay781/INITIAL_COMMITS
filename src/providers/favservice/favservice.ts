import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FavserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FavserviceProvider Provider');
  }

  addtofavelist(obj){
  return new Promise((resolve , reject) => { 
  	this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/addToFav?userid=' + localStorage.getItem('id') + '&disputeid=' + obj).subscribe(res => {

      resolve(res); 
      
    }, (err) => {
      reject(err);
    });
   }
   ); 

  }

   removetofavelist(id){
  return new Promise((resolve , reject) => { 
  	this.http.get('http://rezolve.betaplanets.com/rezolve/authservice/removeFavById?user_id='+ localStorage.getItem('id')+'&disp_id='+id).subscribe(res => {

      resolve(res); 
      
    }, (err) => {
      reject(err);
    });
   }
   ); 

  }


}

//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
//import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  public url:string = "http://localhost/MyAppRestApi/";
  public added_link:string;
  public data:any;
  public post_response:any;
  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  
postData(item,added_url) {
  return new Promise((resolve, reject) =>{
    let headers = new Headers();
    this.http.post(this.url+added_url, JSON.stringify(item), {headers: headers}).
    subscribe(res =>{
      resolve(res.json());
    }, (err) =>{
      reject(err);
    });

  });

}

  getData(added_url){
    return new Promise((resolve,reject)=>{
      let headers = new Headers();
      this.http.get(this.url+added_url,{headers:headers}).
      subscribe(res=>{
        resolve(res.json())
      },(err)=>{
        reject(err);
      }
     
     )
    })
  }

  


//end of the http request
}

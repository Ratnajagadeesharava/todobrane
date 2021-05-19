import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';
import  {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
 private postsObs:Observable<any>|undefined;
 private url:string="https://jsonplaceholder.typicode.com/posts"
  constructor(private httpClient:HttpClient) { 

  }
  getData():Observable<any>{
    return this.httpClient.get(this.url);
  }
  delete(post:any){
    return this.httpClient.delete(this.url+"/"+post.id,post);
  }
  Insert(post:any){
    return this.httpClient.post(this.url,post);
  }
  Update(post:any){
    // console.log(post);
    return this.httpClient.put(this.url+"/"+post.id,post);
  }
}

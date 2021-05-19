import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  posts:Post[]|any;
  post:Post={
    userId :0,
    title:"",
    body:"",
    id:1
  };
  temp:Post = {
    id:0,
    userId:0,
    title:"",
    body:""
  };
  first:boolean =true;;
  index:number =-1; 
  l:number=0;
  updateMethod:boolean = false;
  constructor(private httpClient:HttpClient) { }
  url:string="https://jsonplaceholder.typicode.com/posts";
  ngOnInit(): void {
    this.httpClient.get(this.url).subscribe(
      (result:Post[]|any)=>{
        this.posts = result;
        // this.l = result.length;
        setTimeout(()=>{
          this.l = this.posts.length;
          console.log(this.l);
        },1000);
        
      }
    );
  }
  Submit(post:Post){
    if(!this.updateMethod){
      let i = this.posts[0].id;
      console.log(this.posts[0]);
      let k = i;
      if(this.first){
        k=100;
        this.first =false;
      }
      post.id =k+1;
           this.httpClient.post(this.url,post).subscribe(result=>{
        console.log(result);
        let temppost: Post = post;
        this.posts.unshift(temppost);
        this.post = this.temp;
      },error=>console.log(error));
      this.l++;
    }
    else{
      this.httpClient.put(this.url+"/"+this.post.id,this.post).subscribe(result=>{
        console.log(result);
        this.posts[this.index] = this.post;
        this.post = this.temp;
      
      this.updateMethod =false;
      
      },error=>console.log(error));
      
    }
  }
  Delete(post:Post){
    console.log(post.id);
    this.httpClient.delete(this.url+"/"+post.id).subscribe(result=>{
      let i:number = this.posts.indexOf(post);
      this.posts.splice(i,1);
      console.log(result);
    },
    error=>{
      console.log(error);    }
    );
    // this.posts.
    this.l--;

  }
  
  update(post:Post){
    this.updateMethod = true;
    this.post = post;
    this.index = this.posts.indexOf(post);
    // this.Submit();
  }
}

interface Post{
  userId:number;
  id:number;
  title:string;
  body:string;

}
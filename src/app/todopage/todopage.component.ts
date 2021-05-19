import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.css'],
})
export class TodopageComponent implements OnInit {
  posts: Post[] = [];
  update :boolean = false;
  post: Post = {
    userId: 0,
    title: '',
    body: '',
    id: 1,
  };
  temp: Post = {
    userId: 0,
    title: '',
    body: '',
    id: 1,
  };
  editOption: boolean = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response: Post[]) => {
        this.posts = response;
      },
      (error) => {
        console.log(error.error + '\n status:' + error.status);
      }
    );
  }
  insert() {
    this.editOption = true;
  }
  Edit(post: Post) {
    this.update = true;
    this.editOption = true;
    this.post = post;
    
  }
  Update(){
    const i:number = this.posts.indexOf(this.post);
    
    // this.post = post;
    const post:Post = {
      id:this.post.id,
      userId:this.post.userId,
      title:this.post.title,
      body:this.post.body
    };

    this.dataService.Update(post).subscribe(
      response=>{
        this.update = false;
        console.log(this.update)
        this.posts[i] = post;
        this.post = this.temp;
        
      },
      error=>{
        console.log(error);
      }
    );
  }
  Submit() {
    console.log(this.post);
    const l =  this.posts.length;
    const i:number =  this.posts[l-1].id;
    
    const post:Post = {
      id:i+1,
      userId:this.post.userId,
      title:this.post.title,
      body:this.post.body

    }
    this.dataService.Insert(post).subscribe(response=>{
      console.log(response);
      
        this.posts.push(post);
        this.post = this.temp;
    },
    error=>{
      console.log(error);
    }
    );
  }
  close() {
    this.editOption = false;
  }
  Delete(post: Post): void {
    this.dataService.delete(post).subscribe(
      response=>{
      console.log(post);
      let i : number = this.posts.indexOf(post);
      this.posts.splice(i,1);
        console.log(response); 
      },
      error=>console.log(error.error)
    );
  }
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

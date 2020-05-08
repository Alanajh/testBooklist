import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../posts/post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit{
  /*
  posts = [
    {title: "Shakespeare", content: "Othello"},
    {title: "Jeanette Winterson", content: "Atlas"},
    {title: "Goethe\'s", content: "Dr. Faustus"}
  ];
  */
 private postsSub: Subscription;
posts: Post[] = [];
isLoading = false;

constructor(public postsService: PostsService){}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) =>{
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}

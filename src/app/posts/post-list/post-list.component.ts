import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../posts/post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';

import { PageEvent } from "@angular/material/paginator";

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

posts: Post[] = [];
isLoading = false;
currentPage = 1;
totalPosts = 0;
postsPerPage = 2;
pageSizeOptions = [1, 2, 5, 10];

private postsSub: Subscription;

constructor(public postsService: PostsService){}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) =>{
      this.isLoading = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
  
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { Post } from '../../posts/post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
  enteredTitle = "";
  enteredContent= "";

  constructor (public postsServixe: PostsService){}

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    this.postsServixe.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  onClearPost(){
    this.enteredTitle = "";
    this.enteredContent= "";
  }
}

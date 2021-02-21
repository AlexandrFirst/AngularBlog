import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/components/Interfaces';
import { PostService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup
  post:Post
  submitted = false
  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap((params:Params)=>{
        return this.postsService.getById(params['id'])
      })).subscribe((post:Post)=>{
        this.post = post
          this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text,Validators.required)
          })
      })
    }
    
    submit(){
      this.submitted = true
      if(this.form.invalid){
        return
      }

      this.postsService.update({
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title
      }).subscribe(()=>{
        this.submitted = false
        this.alertService.warning('Пост был обновлён')
      })  
    }

}

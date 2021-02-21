import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/components/Interfaces';
import { AuthService } from '../shared/services/Auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  submitted = false
  message:string
  constructor(public auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params)=>{
      if(params['loginAgain']){
        this.message = 'Пожалйста, введите данный'
      }else if(params['authFailed']){
        this.message = 'Сессия истекла. Введите данные заного'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    const user:User = {
      email:this.form.value.email,
      password:this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, ()=>{this.submitted = false})

  }

}

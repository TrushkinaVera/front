import { Component, OnInit } from '@angular/core';
import {User} from '../model/model.user';
import {UserService} from '../servises/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.userService.logIn(this.user)
      .subscribe(data => {
        this.router.navigate(['/main']);
        }, err => {
          this.errorMessage = ('Неправильный логин или пароль');
        }
      );
  }

}

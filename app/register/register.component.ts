import { Component, OnInit } from '@angular/core';
import {UserService} from '../servises/user.service';
import {User} from '../model/model.user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  password2: string;
  errorMessage: string;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  register() {
    this.userService.createAccount(this.user).subscribe(data => {
      this.router.navigate(['/login']);
      }, err => {
        this.errorMessage = 'Данное имя занято';
      }
    );
  }
}

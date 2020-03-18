import { Component, OnInit } from '@angular/core';
import {User} from '../model/model.user';
import {Router} from '@angular/router';
import {UserService} from '../servises/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;
  isCheck: boolean;
  constructor(public service: UserService, public router: Router) {
  }

  ngOnInit() {
    this.isCheck = true;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  getCurrentUser() {
    let user: User;
    user =  JSON.parse(localStorage.getItem('currentUser'));
    return user.username;
  }

  logOut() {
    this.service.logOut()
      .subscribe(
        data => {
          localStorage.removeItem('userHash');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        error => {

        });
  }
}

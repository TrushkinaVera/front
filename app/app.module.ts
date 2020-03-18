import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import {PointService} from './servises/point.service';
import {HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserService} from './servises/user.service';
import { TableComponent } from './table/table.component';
import {SecurityGuard} from './security-guard.service';
import { ProfileComponent } from './profile/profile.component';

const appRoutes: Routes = [

  { path: 'register',
    component: RegisterComponent,
    canActivate: [SecurityGuard]
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [SecurityGuard]
  },
  { path: 'login',
    component: LoginComponent,
    canActivate: [SecurityGuard]
  },
  {
    path: 'main',
    component: ProfileComponent,
    canActivate: [SecurityGuard]
  },
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    TableComponent,
    ProfileComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PointService, UserService, SecurityGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../shared/services/login/login.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public error: string;
  public spark_boton: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.spark_boton = 'Login with spark';
  }

  ngOnInit() {
    this._route.queryParams.subscribe(
      result => {
        _.forEach(result, (obj) => {
          if (obj.length > 0) {
            this._loginService.getToken(obj).subscribe(
              result => {
                if (result) {
                  this._router.navigate(['/notifications']);
                } else {
                  this.error = 'El usuario no tiene permiso para acceder a la aplicación';
                  //toast
                  console.log(this.error);
                }
              }
            );
          } else {
            console.log("dasdasd");
          }
        });
      }
    );
  }

  sparkLogin() {
    this._loginService.sparkLogin().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

}

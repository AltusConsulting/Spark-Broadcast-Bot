import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../shared/services/login/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppComponent } from '../../app.component'; 
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
    private _loginService: LoginService,
    private app_comp: AppComponent,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef

  ) {
    this.spark_boton = 'Login with spark';
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this._route.queryParams.subscribe(
      result => {
        console.log(result.code)
        if (result.code !== undefined) {
          this._loginService.getToken(result.code).subscribe(
            res => {
              if (res) {
                this._router.navigate(['/notifications']);
              } else {
                console.log('result:', res);
              }
            },
            error => {
              let mssg = 'User does not have permission to access the application!';
              this.showMessage(mssg);
              this._router.navigate(['/']);
            }
          );
        } else {
          console.log("Empty url params");
        }
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

  showMessage(mssg) {
    let obj = {toastLife: '3000'};
    this.toastr.warning(mssg, 'Alert!', obj);
  }

  showHide(){
    return !this.app_comp.showHide();
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './config/security/auth.guard';
import { LoginService } from './shared/services/login/login.service';
import { AuthorizationService } from './shared/services/authorization/authorization.service';
import { NotificationsModel } from './models/notifications/notifications';
import { NotificationsService } from './shared/services/notifications/notifications.service';
import { FilterPipe } from './shared/pipes/filter';
import * as _ from "lodash";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService, AuthorizationService, NotificationsService]
})
export class AppComponent {
  public title: string;
  public copyright: string;
  public allright: string;
  public copyright_more: string;
  public content: string;
  public placeholder: string;
  public notification_data: NotificationsModel;
  public topics: Array<any>;
  public selected_data: Array<any>;
  public user: string;
  public static loadTopics;
  public filter_topic: string;
  public management: string;
  public logout: string;




  constructor(
    private auth: AuthGuard, 
    private _loginService: LoginService,
    private _authorizationService: AuthorizationService, 
    private _notification: NotificationsService
  ) {
      // Name of the application
    this.title = ' Spark Broadcast Bot';
    this.copyright = '© ' + this.getDate();
    this.notification_data = new NotificationsModel('','');
    this.management = 'Management'
    this.logout = ' Log out';
  }

  getDate(): string {
    let date = new Date();
    return String(date.getUTCFullYear());
  }

  showHide() {
    return this.auth.loggedIn();
  }

  logoutClick(event: Event): void {
    this._loginService.logOut();
    this._authorizationService.logout();
    localStorage.clear();
  }

  ngOnInit() {
  }

  getTopics() {
    this._notification.getTopics().subscribe(
      result => {
        let data = [];
        _.forEach(result, (obj) => {
          data.push({
            id: obj.id,
            text: obj.description
          });
        });
        this.topics = data;
        this.topics = _.map(this.topics, (o) => {
          o.color = this.getColor();
          return o;
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  loadTopics() {
    this.getTopics();
  }

  getColor() {
    let letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}

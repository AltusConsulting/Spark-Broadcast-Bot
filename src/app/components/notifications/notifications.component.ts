import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NotificationsModel } from '../../models/notifications/notifications';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { DATA_SHARED } from '../../shared/services/data';
import { StatsService } from '../../shared/services/stats/stats.service';
import { AppComponent } from '../../app.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from "lodash";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [NotificationsService, StatsService]
  
  
})
export class NotificationsComponent implements OnInit {
  public notifications: string;
  public placeholder: string;
  public notification_data: NotificationsModel;
  public topics: Array<any>;
  public selected_data: Array<any>;
  public splash: boolean;
  public total_subscribers: number;
  public message_copy: string;
  public new_massage: string;
  public btnsend: string;
  public btncancel: string;

  constructor(
    private _notification: NotificationsService,
    private _stats: StatsService,
    private app_comp: AppComponent,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) { 
    this.notifications = 'Notifications';
    this.placeholder = 'Select a topic';
    this.notification_data = new NotificationsModel('','');
    this.selected_data = new Array();
    this.splash = false;
    this.total_subscribers = 0;
    this.new_massage = 'New message';
    this.btnsend = 'Send';
    this.btncancel = 'Cancel';
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if (this.checkInit()) {
      DATA_SHARED.count = 1;
      this.splash = true;
      this.app_comp.loadTopics();
      this.getTopics();
    } else {
      this.splash = true;
      this.getTopics();
    }
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
      },
      error => {
        console.log(error);
      }
    );
  }

  getTotalSubscribers() {
    _.forEach(this.selected_data, (r) => {
      this._notification.getSubscribers(r).subscribe(
        result => {
          this.total_subscribers = this.total_subscribers + result.subscribers.length;
          DATA_SHARED.total = this.total_subscribers;
          this.storeNotifications();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  selected(obj) {
      this.selected_data.push(obj.id);
  }

  removed(obj) {
    let index;
    index = _.findIndex(this.selected_data, (o) => { 
      return o == obj.id; 
    });
    this.selected_data.splice(index, 1);
  }

  dataCheck() {
    if (this.notification_data.message && this.selected_data) {
      return true;
    }
  }

  sendNotification() {
    this.splash = true;
    this.getTotalSubscribers();
    DATA_SHARED.topics = this.selected_data;
    DATA_SHARED.messg = this.notification_data.message;
    this.message_copy = this.notification_data.message;
    this.shortMessage();
    this.notification_data.topic = this.selected_data[0];
    this._notification.sendNotifications(this.notification_data).subscribe(
      result => {
        if (result.status == 200) {
          this.cancel();
          this.showCustom();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.notification_data.message = "";
  }

  deleteTopic(obj) {
    let index;
    this._notification.deleteTopic(obj).subscribe(
      result => {
        if (result.status == 200) {
          index = _.findIndex(this.topics, (o) => { 
            return o.id == obj.id; 
          });
          this.topics.splice(index, 1);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  storeNotifications() {
    let result, store, index;
    result = localStorage.getItem('info');
    store = JSON.parse(result);

    if (store == null) {
      this.saveData();
    } else {
      this.storeData(store);
    }
  }

  shortMessage() {
    let text = this.message_copy;
    if (text.length > 89) {
      text = text.substring(0,89) + '...';
      this.message_copy = text;
    }
  }

  saveData() {
    let data = [];
    data.push({
      'mensaje': [{
        'contenido': this.message_copy,
        'total': this.total_subscribers,
        'topics': []
      }]
    }); 
    for (let i in data) {
      _.forEach(this.selected_data, (o) => {
        this._stats.getTotalSubscribersbyTopic(o).subscribe(
          result => {
            data[i]['mensaje'][i]['topics'].push({
              'topic': o,
              'total': result.subscribers.length
            });
            localStorage.setItem('info', JSON.stringify(data));
          }
        );
      });
    }
  }

  storeData(data) {
    let index;
    if (data.length > 0) {
      data.push({
        'mensaje': [{
          'contenido': this.message_copy,
          'total': this.total_subscribers,
          'topics': []
        }]
      });
      index = data.length -1;
      _.forEach(this.selected_data, (o) => {
        this._stats.getTotalSubscribersbyTopic(o).subscribe(
          result => {
            data[index]['mensaje'][0]['topics'].push({
              'topic': o,
              'total': result.subscribers.length
            });
            localStorage.removeItem('info');
            localStorage.setItem('info', JSON.stringify(data));
          }
        );
      });
    }
  }

  checkInit() {
    if (DATA_SHARED.count == 0) {
      return true;
    } else {
      return false;
    }
  }
  
  showCustom() {
    // let obj = {
    //   dismiss: 'click',
    //   enableHTML: true,
    //   showCloseButton: true
    // };
    // this.toastr.info('<span>'+mssg+'</span><br/><a style="border:1px solid white;padding: 5px;margin: 5px" routerLink="[\'/splash\']">Statistics</a>', 'Info!', obj);
    let mssg = 'Message sent successfully';
    let obj = {toastLife: '3000'};
    this.toastr.info(mssg, 'Info!', obj);
  }

}

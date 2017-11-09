import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../shared/services/messages/messages.service';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppComponent } from '../../app.component'; 
import * as _ from "lodash";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessagesService, NotificationsService]
})
export class MessagesComponent implements OnInit {
  public qry_string: string;
  public filtered_messages: Array<any>;
  public color: string;
  public topic: string;
  public total_messages: number;
  public message: string;
  public participants: Array<any>;
  public participants_header: string;
  public text_mssg: string;
  public text_mssg_id: string;
  public options_editor = {};
  public btnsend: string;

  constructor(
    private _route: ActivatedRoute,
    private _messages: MessagesService,
    private _notification: NotificationsService,
    private app_comp: AppComponent,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) { 
    this.total_messages = 0;
    this.message = 'No results found';
    this.participants_header = 'Subscribers';
    this.text_mssg = '';
    this.text_mssg_id = '';
    this.options_editor = {
      "hideIcons": ['FullScreen']
    }
    this.btnsend = 'Send'
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getQueryParameters();
  }

  getQueryParameters() {
    this._route.queryParams.subscribe(
      result => {
        this.qry_string = result.id;
        this.color = result.color;
        this.topic = result.desc;
        this.getMessages(this.qry_string);
        this.getParticipants(this.qry_string);
        this.app_comp.loadTopics(this.color, result.id);
      }
    );
  }

  getMessages(id) {
    this._messages.getMessages(id).subscribe(
      result => {
        this.filtered_messages = result;
        this.total_messages = this.filtered_messages.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  getParticipants(id) {
    this._messages.getParticipants(id).subscribe(
      result => {
        this.participants = result.subscribers;
      },
      error => {
        console.log(error);
      }
    );
  }

  send() {
    this.text_mssg_id = this.qry_string;
    let obj = {
      'topic': this.text_mssg_id,
      'message': this.text_mssg
    }
    this._notification.sendNotifications(obj).subscribe(
      result => {
        if (result.status == 200) {
          this.text_mssg = '';
          this.showMessage();
          this.refreshMessages();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  dataCheck() {
    if (this.text_mssg) {
      return true;
    }
  }

  refreshMessages() {
    this._route.queryParams.subscribe(
      result => {
        this.qry_string = result.id;
        this.getMessages(this.qry_string);
      },
      error => {
        console.log(error);
      }
    );
  }

  showMessage() {
    let mssg = 'Message sent successfully';
    let obj = {toastLife: '3000'};
    this.toastr.info(mssg, 'Info!', obj);
  }

}

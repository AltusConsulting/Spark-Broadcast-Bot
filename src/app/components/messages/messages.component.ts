import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../shared/services/messages/messages.service';
import * as _ from "lodash";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  providers: [MessagesService]
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

  constructor(
    private _route: ActivatedRoute,
    private _messages: MessagesService
  ) { 
    this.total_messages = 0;
    this.message = 'No results found';
    this.participants_header = 'Subscribers';
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

}

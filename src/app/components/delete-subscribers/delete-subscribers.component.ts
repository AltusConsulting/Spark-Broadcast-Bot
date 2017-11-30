import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import * as _ from "lodash";

@Component({
  selector: 'app-delete-subscribers',
  templateUrl: './delete-subscribers.component.html',
  styleUrls: ['./delete-subscribers.component.scss'],
  providers: [NotificationsService]
})
export class DeleteSubscribersComponent implements OnInit {
  public modalRef: BsModalRef;
  public question: string;
  public title: string;
  @Input('obj') subscriber: string;
  @Input('subscribers') subscribers: [{id: '', text: ''}];
  public subscriber_email: string;

  constructor(
    private modalService: BsModalService,
    private _notification: NotificationsService
  ) {
    this.title = 'Delete topic';
    this.subscriber_email = '';
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.subscriber_email = this.subscriber;
    this.question = 'Would you like to remove the subscriber ' + this.subscriber_email + '?';
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  close() {
    this.modalRef.hide();
  }

  deleteSubscriber() {
    let index;
    console.log("Subscriber deleted!!!");
    index = _.findIndex(this.subscribers, (o) => { 
      return o == this.subscriber; 
    });
    this.subscribers.splice(index, 1);
    this.modalRef.hide();
  }
}

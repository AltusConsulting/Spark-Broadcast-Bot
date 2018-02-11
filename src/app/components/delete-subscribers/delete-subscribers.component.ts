import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { SubscriptionsService } from '../../shared/services/subscriptions/subscriptions.service';
import { Subscription } from '../../models/subscription/subscription';
import * as _ from "lodash";

@Component({
  selector: 'app-delete-subscribers',
  templateUrl: './delete-subscribers.component.html',
  styleUrls: ['./delete-subscribers.component.scss'],
  providers: [SubscriptionsService]
})
export class DeleteSubscribersComponent implements OnInit {

  @Input('topic') topic: string;
  @Input('obj') subscriber: string;
  @Input('subscribers') subscribers: [{id: '', text: ''}];

  public modalRef: BsModalRef;
  public question: string;
  public title: string;
  
  public subscriber_email: string;
  public subscription_data: Subscription;

  constructor(
    private modalService: BsModalService,
    private _subscription: SubscriptionsService
  ) {
    this.title = 'Delete topic';
    this.subscriber_email = '';
    this.subscription_data = new Subscription("",[]);
  }

  ngOnInit() {
    this.load();
    console.log("delete ---"+this.topic);
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
    this.subscription_data = new Subscription(this.topic, [this.subscriber_email]);
    this._subscription.deleteSubscription(this.subscription_data).subscribe(
      result => {
        if (result.status == 200) {
          console.log("Subscriber deleted!!!");
          index = _.findIndex(this.subscribers, (o) => { 
            return o == this.subscriber; 
          });
          this.subscribers.splice(index, 1);
          this.modalRef.hide();
        }
      },
      error => {
        console.log(error);
      }
    );
    
  }
}

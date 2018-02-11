import { Component, OnInit, TemplateRef, Input, ViewChild, ElementRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { SubscriptionsService } from '../../shared/services/subscriptions/subscriptions.service';
import { MessagesComponent} from "../../components/messages/messages.component";
import { Subscription } from '../../models/subscription/subscription';
import * as _ from "lodash";

@Component({
  selector: 'app-add-subscribers',
  templateUrl: './add-subscribers.component.html',
  styleUrls: ['./add-subscribers.component.scss'],
  providers: [SubscriptionsService]
})
export class AddSubscribersComponent implements OnInit {
  public modalRef: BsModalRef;
  public title: string;
  @Input('topic') topic: any;

  public selectedSubscribers: Array<any>;
  public typedEmail: string;
  public subscription_data: Subscription;

  public items:Array<string> = [];

  @ViewChild("select") select: ElementRef;


  constructor(
    private modalService: BsModalService,
    private _subscription: SubscriptionsService,
    private msgs_comp: MessagesComponent
  ) {}

  ngOnInit() {
    this.title = 'Add subscribers';
    this.selectedSubscribers = new Array<any>();
    this.subscription_data = new Subscription("",[]);
    this.typedEmail = "";
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSubscriber(form){

    this.subscription_data.topic = this.topic;
    this.subscription_data.users = this.selectedSubscribers;

    this._subscription.addSubscription(this.subscription_data)
    .subscribe(
      result => {
        if (result.status == 200) {
          this.msgs_comp.getParticipants(this.topic);
          console.log("email added");
          this.clearModel();
          this.close();
        }
      },
      error => {
        console.log(error);
      }
    );
      
    
    // Add subscription service
  }

  clearModel() {
    this.selectedSubscribers = [];
  }

  dataCheck() {
    if (this.selectedSubscribers.length>0) {
      return true;
    }
  }

  public selected(value:any):void {
    this.selectedSubscribers.push(value.text);
  }

  public removed(value:any):void {
    let index;
    index = _.findIndex(this.selectedSubscribers, (o) => { 
      return o == value.text; 
    });

    this.selectedSubscribers.splice(index,1);
  }

  public typed(value:any):void {
    this.typedEmail = value;
  }

  public addTypedEmailToList(){
    this.items.push(this.typedEmail);
  }

  close() {
    this.modalRef.hide();
  }

}

import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import { MessagesComponent} from "../../components/messages/messages.component";
import { Admins } from '../../models/admins/admins';
import * as _ from "lodash";

@Component({
  selector: 'app-add-subscribers',
  templateUrl: './add-subscribers.component.html',
  styleUrls: ['./add-subscribers.component.scss'],
  providers: [NotificationsService]
})
export class AddSubscribersComponent implements OnInit {
  public modalRef: BsModalRef;
  public title: string;
  public subscriber: Admins;


  constructor(
    private modalService: BsModalService,
    private _notification: NotificationsService,
    private msgs_comp: MessagesComponent
  ) {
    this.title = 'Add subscribers';
  }

  ngOnInit() {
    this.subscriber = new Admins('','');
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSubscriber(form){
    this.msgs_comp.participants.push(this.subscriber.email);
    this.close();
    this.subscriber = new Admins('','');
    // Add subscription service
  }

  clearModel() {
    this.subscriber.id = '';
    this.subscriber.email = '';
  }

  dataCheck() {
    if (this.subscriber.email) {
      return true;
    }
  }

  close() {
    this.modalRef.hide();
  }

}

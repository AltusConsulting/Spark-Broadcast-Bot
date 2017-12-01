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
  public selectedSubscribers: Array<any>;

  public items:Array<string> = ['gsalazar@altus.cr','ajimenez@altus.cr','ebarquero@altus.cr','rgonzalez@altus.cr'];


  constructor(
    private modalService: BsModalService,
    private _notification: NotificationsService,
    private msgs_comp: MessagesComponent
  ) {
    this.title = 'Add subscribers';
  }

  ngOnInit() {
    this.selectedSubscribers = new Array<any>();
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addSubscriber(form){
    this.selectedSubscribers.forEach( s =>{
      this.msgs_comp.participants.push(s);
    });
    this.clearModel();
    this.close();
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
    let index;
    index = _.findIndex(this.items, (o) => { 
      return o == value.text; 
    });

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
    console.log('New search input: ', value);
  }

  close() {
    this.modalRef.hide();
  }

}

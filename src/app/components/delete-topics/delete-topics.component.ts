import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { NotificationsService } from '../../shared/services/notifications/notifications.service';
import * as _ from "lodash";

@Component({
  selector: 'app-delete-topics',
  templateUrl: './delete-topics.component.html',
  styleUrls: ['./delete-topics.component.scss'],
  providers: [NotificationsService]
})
export class DeleteTopicsComponent implements OnInit {
  public modalRef: BsModalRef;
  public question: string;
  public title: string;
  @Input('obj') topic: {id: '', text: ''};
  @Input('topics') topics: [{id: '', text: '', color: ''}];
  public topic_name: string;
  public btndelete: string;
  public btncancel: string;

  constructor(
    private modalService: BsModalService,
    private _notification: NotificationsService
  ) {
    this.title = 'Delete topic';
    this.topic_name = '';
    this.btndelete = 'Delete';
    this.btncancel = 'Cancel';
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.topic_name = this.topic.text;
    this.question = 'Would you like to remove the topic ' + this.topic_name + '?';
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  close() {
    this.modalRef.hide();
  }

  deleteTopic() {
    let index;
    this._notification.deleteTopic(this.topic).subscribe(
      result => {
        if (result.status == 200) {
          console.log("Topic eliminado!!!");
          index = _.findIndex(this.topics, (o) => { 
            return o.id == this.topic.id; 
          });
          this.topics.splice(index, 1);
          this.modalRef.hide();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}

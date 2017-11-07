import { Component, OnInit } from '@angular/core';
import { TopicsModel } from '../../models/topics/topics';
import { TopicsService } from '../../shared/services/topics/topics.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  providers: [TopicsService]
})
export class TopicsComponent implements OnInit {
  public title: string;
  public placeholder: string;
  public btn_send: string;
  public btn_cancel: string;
  public topic_data: TopicsModel;

  constructor(
    private _topics: TopicsService,
    private app_comp: AppComponent
  ) { 
    this.title = 'New topic';
    this.placeholder = 'Enter a new topic';
    this.btn_send = 'Add';
    this.btn_cancel = 'Cancel';
    this.topic_data = new TopicsModel('','');

  }

  ngOnInit() {
  }

  send() {
    this.topic_data.description = this.topic_data.id;
    this._topics.addTopic(this.topic_data).subscribe(
      result => {
        if (result.status == 200) {
          this.app_comp.loadTopics();
          this.clearModel();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.clearModel();
  }
  
  dataCheck() {
    if (this.topic_data.id) {
      return true;
    }
  }

  clearModel() {
    this.topic_data.id = '';
    this.topic_data.description = '';
  }

}

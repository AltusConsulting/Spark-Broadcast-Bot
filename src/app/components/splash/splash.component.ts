import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DATA_SHARED } from '../../shared/services/data';
import { StatsService } from '../../shared/services/stats/stats.service';
import { AppComponent } from '../../app.component';
import * as _ from "lodash";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  providers: [StatsService]
})
export class SplashComponent implements OnInit {
  public splash: boolean;
  public total: number;
  public text_people: string;
  public msg: string;
  public message_content: string;
  public topics_content: Array<any>;
  public header_messg: string;
  public count: number;
  public topics_count: string;
  public topic_title: string;
  public total_susbscribers: number;
  public total_topic: number;
  public messages: Array<any>;
  public general: string;
  public statistics: string;
  public notfound: string;
  public btnback: string;

  constructor(
    private _route: ActivatedRoute,
    private _stats: StatsService,
    private app_comp: AppComponent
  ) {
    this.splash = false;
    this.text_people = "people";
    this.msg = 'Message sent successfully';
    this.header_messg = 'Message: ';
    this.topic_title = 'Topic: ';
    this.count = 1;
    this.general = 'General: ';
    this.statistics = 'Statistics';
    this.notfound = 'No results found';
    this.btnback = ' Back';
  }

  ngOnInit() {
    this.splash = true;
    this.loadData();
    this.getTotalSubscribersbyTopic();
    this.renderData();
  }

  loadData() {
    this.total = DATA_SHARED.total;
    this.message_content = DATA_SHARED.messg;
    this.topics_content = DATA_SHARED.topics;
    this.count = this.count + this.topics_content.length;
    this.topics_count = String(this.count);
    this.app_comp.loadTopics()
  }

  getTotalSubscribersbyTopic() {
    _.forEach(this.topics_content, (o) => {
      this._stats.getTotalSubscribersbyTopic(o).subscribe(
        result => {
          this.total_topic = result.subscribers.length;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  renderData() {
    let result, store;
    result = localStorage.getItem('info');
    if (result != null) {
      this.messages = JSON.parse(result);
    }
  }

  


}

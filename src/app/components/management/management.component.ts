import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../../shared/services/management/management.service';
import { Admins } from '../../models/admins/admins';
import * as _ from 'lodash';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  providers: [ManagementService]
})
export class ManagementComponent implements OnInit {
  public adminData: Array<any>;

  constructor(
    private _mngt: ManagementService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.getAdmins();
  }

  getAdmins() {
    this._mngt.getAllAdmins().subscribe(
      result => {
        this.adminData = _.map(result, (result) => {
          let admin = _.cloneDeep(result);
          console.log(result);
          return admin;
        })
      },
      error => {
        console.log(error)
      }
    )
    return true;
  }

  loadTable() {
    var promise = new Promise<boolean>((resolve, reject) => {
      resolve(this.getAdmins())
    })
    return promise;
  }

}

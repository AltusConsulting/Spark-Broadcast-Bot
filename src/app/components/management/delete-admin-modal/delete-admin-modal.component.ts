import { Component, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ManagementService } from '../../../shared/services/management/management.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Admins } from '../../../models/admins/admins';
import { ManagementComponent } from '../../management/management.component';

@Component({
  selector: 'app-delete-admin-modal',
  templateUrl: './delete-admin-modal.component.html',
  styleUrls: ['./delete-admin-modal.component.scss'],
  providers: [ManagementService]
})
export class DeleteAdminModalComponent implements OnInit {
  public modalRef: BsModalRef;
  public question: string;
  public title: string;
  @Input('obj') admin: Admins;

  constructor(
    private modalService: BsModalService,
    private _mngt: ManagementService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public mng_comp: ManagementComponent
  ) {
    this.title = 'Revoke Administrator privileges.';
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.load();
  }

  load() {
    this.question = 'Do you wish to revoke user ' + this.admin.email + '\'s administrator privilege?';
  }

  deleteAdmin() {
    this._mngt.deleteAdmin(this.admin).subscribe(
      result => {
        if (result.status == 200) {
          this.mng_comp.loadTable().then((res) => {
            if (res) {
              setTimeout(() => {
                this.showSuccess();
              }, 450);
            }
          });
          this.modalRef.hide();
        }
      },
      error => {
        console.log(error)
      }
    );
  }


  close() {
    this.showWarning();
    this.modalRef.hide();
  }

  showSuccess() {
    let obj = {toastLife: '3000'};
    this.toastr.success('User '+this.admin.email+'\'s administrator privileges have been revoked', 'Successful!', obj);

  }

  showWarning() {
    let obj = {toastLife: '3000'};
    this.toastr.info('User\'s privileges were not changed', 'Info!', obj);
  }

  showUnique(mssg) {
    let obj = {toastLife: '3000'};
    this.toastr.warning(mssg, 'Alert!', obj);
    this.modalRef.hide();
  }

}

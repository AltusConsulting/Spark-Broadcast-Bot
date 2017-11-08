import { Component, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ManagementService } from '../../../shared/services/management/management.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ManagementComponent } from '../../management/management.component';
import { Admins } from '../../../models/admins/admins';

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.scss'],
  providers: [ManagementService]
})
export class AddAdminModalComponent implements OnInit {
  public modalRef: BsModalRef;
  public botton_name: string;
  public title: string
  public admin: Admins;

  constructor(
    private modalService: BsModalService,
    private _mngt: ManagementService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public mng_comp: ManagementComponent
  ) {
    this.botton_name = 'Add Administrator';
    this.title = this.botton_name;
    this.admin = new Admins('', '');
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  addAdmin(form) {
    this.admin.id = this.admin.email
    this._mngt.addAdmin(this.admin).subscribe(
      result => {
        if (result.status == 201) {
          this.mng_comp.loadTable().then((res) => {
            if (res) {
              setTimeout(() => {
                this.showSuccess(form);
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

  showSuccess(form) {
    let obj = {toastLife: '3000'};
    this.toastr.success('User '+this.admin.email+' has been granted admin permision', 'Successful!', obj);
    console.log(form)
    form.resetForm();
  }

  showWarning() {
    let obj = {toastLife: '3000'};
    this.toastr.info('User was not added to admin list', 'Info!', obj);
  }

  showUnique(mssg) {
    let obj = {toastLife: '3000'};
    this.toastr.warning(mssg, 'Alert!', obj);
    this.modalRef.hide();
  }

}

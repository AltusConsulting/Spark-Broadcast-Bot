import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminModalComponent } from './delete-admin-modal.component';

describe('DeleteAdminModalComponent', () => {
  let component: DeleteAdminModalComponent;
  let fixture: ComponentFixture<DeleteAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

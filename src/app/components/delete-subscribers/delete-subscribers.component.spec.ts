import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubscribersComponent } from './delete-subscribers.component';

describe('DeleteSubscribersComponent', () => {
  let component: DeleteSubscribersComponent;
  let fixture: ComponentFixture<DeleteSubscribersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubscribersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

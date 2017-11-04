import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTopicsComponent } from './delete-topics.component';

describe('DeleteTopicsComponent', () => {
  let component: DeleteTopicsComponent;
  let fixture: ComponentFixture<DeleteTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgErroFormControlComponent } from './msg-erro-form-control.component';

describe('MsgErroFormControlComponent', () => {
  let component: MsgErroFormControlComponent;
  let fixture: ComponentFixture<MsgErroFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgErroFormControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgErroFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

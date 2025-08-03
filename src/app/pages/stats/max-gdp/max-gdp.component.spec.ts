import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxGdpComponent } from './max-gdp.component';

describe('MaxGdpComponent', () => {
  let component: MaxGdpComponent;
  let fixture: ComponentFixture<MaxGdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxGdpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxGdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

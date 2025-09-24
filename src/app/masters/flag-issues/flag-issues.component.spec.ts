import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagIssuesComponent } from './flag-issues.component';

describe('FlagIssuesComponent', () => {
  let component: FlagIssuesComponent;
  let fixture: ComponentFixture<FlagIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagIssuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlagIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

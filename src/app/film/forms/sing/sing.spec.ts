import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sing } from './sing';

describe('Sing', () => {
  let component: Sing;
  let fixture: ComponentFixture<Sing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

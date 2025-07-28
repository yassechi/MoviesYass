import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMovie } from './display-movie';

describe('DisplayMovie', () => {
  let component: DisplayMovie;
  let fixture: ComponentFixture<DisplayMovie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMovie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMovie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

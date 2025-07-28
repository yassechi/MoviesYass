import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFilm } from './get-film';

describe('GetFilm', () => {
  let component: GetFilm;
  let fixture: ComponentFixture<GetFilm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetFilm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFilm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUpdateModalComponent } from './book-update-modal.component';

describe('BookUpdateModalComponent', () => {
  let component: BookUpdateModalComponent;
  let fixture: ComponentFixture<BookUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookUpdateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

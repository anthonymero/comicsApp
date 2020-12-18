import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePictureModalComponent } from './user-profile-picture-modal.component';

describe('UserProfilePictureModalComponent', () => {
  let component: UserProfilePictureModalComponent;
  let fixture: ComponentFixture<UserProfilePictureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfilePictureModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePictureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

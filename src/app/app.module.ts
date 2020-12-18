import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionFormComponent } from './collection-list/collection-form/collection-form.component';
import { SingleCollectionComponent } from './collection-list/single-collection/single-collection.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// Services
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faPencilAlt, IconDefinition, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGoogleWallet, faFacebook, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

// angularfire imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// environment import
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './app-angular-material.module';
import { UserProfilePictureModalComponent } from './user-profile/user-profile-picture-modal/user-profile-picture-modal.component';

const icons: IconDefinition[] = [
  faGoogle,
  faGoogleWallet,
  faSignInAlt,
  faFacebook,
  faFacebookSquare,
  faPencilAlt,
  faEnvelope,
  faUser
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    CollectionListComponent,
    CollectionFormComponent,
    SingleCollectionComponent,
    VerifyEmailComponent,
    UserProfileComponent,
    ConfirmModalComponent,
    UserProfilePictureModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularMaterialModule

  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService,
    UsersService,
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [ConfirmModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {

    // Add an icon to the library for convenient access in other components
    library.addIcons(...icons);
  }
}

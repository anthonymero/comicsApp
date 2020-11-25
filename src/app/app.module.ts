import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionFormComponent } from './collection-list/collection-form/collection-form.component';
import { SingleCollectionComponent } from './collection-list/single-collection/single-collection.component';

// Font Awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCircle, faSquare, faSignInAlt , IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faGoogleWallet, faFacebook, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

// angularfire imports
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// environment import
import { environment } from '../environments/environment';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

const icons: IconDefinition[] = [
  faGoogle,
  faGoogleWallet,
  faSignInAlt,
  faFacebook,
  faFacebookSquare
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
    VerifyEmailComponent
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
    FontAwesomeModule

  ],
  providers: [
    AuthService,
    BooksService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {

    // Add an icon to the library for convenient access in other components
    library.addIcons(...icons);
  }
}

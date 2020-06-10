import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionFormComponent } from './collection-list/collection-form/collection-form.component';
import { SingleCollectionComponent } from './collection-list/single-collection/single-collection.component';


const routes: Routes = [
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/signin',
    component: SigninComponent
  },
  {
    path: 'books',
    canActivate: [AuthGuardService],
    component: BookListComponent
  },
  {
    path: 'books/new',
    canActivate: [AuthGuardService],
    component: BookFormComponent
  },
  {
    path: 'books/view/:id',
    canActivate: [AuthGuardService],
    component: SingleBookComponent,
  },
  {
    path: 'collections',
    canActivate: [AuthGuardService],
    component: CollectionListComponent,
  },
  {
    path: 'collections/new',
    canActivate: [AuthGuardService],
    component: CollectionFormComponent,
  },
  {
    path: 'collections/view/:id',
    canActivate: [AuthGuardService],
    component: SingleCollectionComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: '**',
    redirectTo: 'books',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


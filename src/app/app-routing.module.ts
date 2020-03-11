import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';


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
    component: BookListComponent
  },
  {
    path: 'books/new',
    component: BookFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


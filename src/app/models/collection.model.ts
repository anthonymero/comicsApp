import { IBook } from './book.model';

export interface ICollection {
  uid?: string;
  name: string;
  editor: string;
  volumeCount: number;
  // Todo enum (over , in progress)
  state: string;
  // Todo enum (adventure, fantastic ...)
  style?: string;
  userId?: string;
  books?: IBook['title'][];
}

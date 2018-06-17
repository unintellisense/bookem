import { IBook } from '../../shared/dto/ibook'

export class Book implements IBook {
  id?: number
  title: string;
  isFiction: boolean;
  isbn: string;
  authors: string;
  description: string;
  libraryIdentifier: string;
  bookSeriesNumber: number | null;
  yearPublished: number | null;
  categories: string[];

  static GetDefaultBook(): Book {
    return {
      title: '',
      isFiction: false,
      isbn: '',
      authors: '',
      description: '',
      libraryIdentifier: '',
      bookSeriesNumber: null,
      yearPublished: null,
      categories: []
    }
  }
}
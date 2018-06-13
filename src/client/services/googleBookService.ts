import axios, { AxiosResponse } from 'axios';
import { GoogleBooksVolumeSearch, SearchResultBook } from '../../shared/dto/googleBook'

const baseGoogleBooksUrl = `https://www.googleapis.com/books`;

const isoDateRegex = /(\d{4})(-\d{2})?(-\d{2})?/

// Promise<AxiosResponse<GoogleBooksVolumeSearch>>
export async function getBooksByIsbn(isbn: string): Promise<SearchResultBook[]> {
  let queryParams = { q: `isbn:${isbn}` }
  let searchResults = await axios.get<GoogleBooksVolumeSearch>(`${baseGoogleBooksUrl}/v1/volumes`, { params: queryParams });
  if (searchResults.data.items) {
    return searchResults.data.items.map(book => {
      // convert iso date to simple year
      let match = isoDateRegex.exec(book.volumeInfo.publishedDate);
      let publishedYear = match ? Number.parseInt(match[1]) : null;

      return {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        authors: book.volumeInfo.authors.join(', '),
        yearPublished: publishedYear,
        categories: book.volumeInfo.categories
      }
    })
  }
  return [];
}

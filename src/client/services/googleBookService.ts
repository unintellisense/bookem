import axios, { AxiosResponse } from 'axios';
import { GoogleBooksVolumeSearch, SearchResultBook } from '../../shared/dto/googleBook'

const baseGoogleBooksUrl = `https://www.googleapis.com/books`;

// Promise<AxiosResponse<GoogleBooksVolumeSearch>>
export async function getBooksByIsbn(isbn: string): Promise<SearchResultBook[]> {
  let queryParams = { q: `isbn:${isbn}` }
  let searchResults = await axios.get<GoogleBooksVolumeSearch>(`${baseGoogleBooksUrl}/v1/volumes`, { params: queryParams });
  if (searchResults.data.items) {
    return searchResults.data.items.map(book => {
      return {
        title: book.volumeInfo.title,
        description: book.volumeInfo.description
      }
    })
  }
  return [];
}

import axios, { AxiosResponse } from 'axios';
import { GoogleBooksVolumeSearch } from '../../shared/dto/googleBook'

const baseGoogleBooksUrl = `https://www.googleapis.com/books`;

export async function getBooksByIsn(isbn: string): Promise<AxiosResponse<GoogleBooksVolumeSearch>> {
  let queryParams = { q: `isbn:${isbn}` }
  return axios.get(`${baseGoogleBooksUrl}/v1/volumes`, { params: queryParams })
}

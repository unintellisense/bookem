import axios, { AxiosResponse } from 'axios'
import * as qs from 'qs'
import { Book } from '../models/book'
import { BookSearchDetailOption } from '../models/manageBookSearchOption'
export type GetBookResponse = {
  results: Book[]
  total: number
}

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook(book: Book): Promise<AxiosResponse<Book>> {
  var payload = book;
  return axios.post<Book>(`${baseApiUrl}/manage/book`, payload, { timeout: 7500 })
}

export async function getBooks(options: {
  page?: number
  count?: number
  searchOptions?: BookSearchDetailOption[]
}): Promise<AxiosResponse<GetBookResponse>> {
  let { page, count, searchOptions } = options;
  let qry: string | null = null;
  if (searchOptions) {
    qry = qs.stringify(searchOptions.reduce((obj, opt) => {
      obj[opt.shortName] = opt.curValue;
      return obj;
    }, {}));
  }
  page = page && page - 1; // decrement by one if defined, value sent matches ui I.E. page 1 equals index 0
  return axios.get<GetBookResponse>(`${baseApiUrl}/manage/book`, { timeout: 7500, params: { page, count, qry } });
}

export async function deleteBook(id: number): Promise<AxiosResponse<Book[]>> {
  return axios.delete(`${baseApiUrl}/manage/book/${id}`, { timeout: 7500 })
}

export async function updatePostBook(book: Book): Promise<AxiosResponse<Book[]>> {
  let { id } = book;  
  delete book.id; // cannot submit with id property, will be interpreted as attempt to update primary key
  return axios.post(`${baseApiUrl}/manage/book/${id}`, book)
}

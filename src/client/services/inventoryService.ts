import axios, { AxiosResponse } from 'axios';
import { Book } from '../models/book'

export type GetBookResponse = {
  results: Book[]
  total: number
}

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook(book: Book): Promise<AxiosResponse<Book>> {
  var payload = { book };
  return axios.post<Book>(`${baseApiUrl}/manage/book`, payload, { timeout: 7500 })
}

export async function getBooks(options: {
  page?: number
  count?: number
}): Promise<AxiosResponse<GetBookResponse>> {
  let { page, count } = options;
  return axios.get<GetBookResponse>(`${baseApiUrl}/manage/book`, { timeout: 7500, params: { page, count } });
}

export async function deleteBook(id: number): Promise<AxiosResponse<Book[]>> {
  return axios.delete(`${baseApiUrl}/manage/book/${id}`, { timeout: 7500 })
}

export async function updatePostBook(book: Book): Promise<AxiosResponse<Book[]>> {
  let { id } = book;
  var payload = { book };
  delete book.id; // cannot submit with id property, will be interpreted as attempt to update primary key
  return axios.post(`${baseApiUrl}/manage/book/${id}`, payload)
}

import axios, { AxiosResponse } from 'axios';
import { Book } from '../models/book'

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook(book: Book): Promise<AxiosResponse<Book>> {
  var payload = { book };
  return axios.post<Book>(`${baseApiUrl}/manage/book`, payload, { timeout: 7500 })
}

export async function getBooks(): Promise<AxiosResponse<Book[]>> {
  return axios.get<Book[]>(`${baseApiUrl}/manage/book`, { timeout: 7500 })
}

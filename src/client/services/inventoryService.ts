import axios, { AxiosResponse } from 'axios';
import { IBook } from '../../shared/dto/ibook'

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook(book: IBook): Promise<AxiosResponse<IBook>> {
  var payload = { book };
  return axios.post(`${baseApiUrl}/manage/book`, payload, { timeout: 7500 })
}

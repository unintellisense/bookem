import axios from 'axios';
import { IBook } from '../../shared/dto/ibook'

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook(book: IBook) {
  return axios.post(`${baseApiUrl}/manage/book`, book)
}

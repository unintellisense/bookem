import axios from 'axios';

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function postBook() {
  return axios.post(`${baseApiUrl}/manage/book`, {})
}

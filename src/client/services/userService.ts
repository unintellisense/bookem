import axios, { AxiosResponse } from 'axios'
import { UserSelfModifiable } from '../../shared/dto/iuser'

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function createUser(userPayload: UserSelfModifiable): Promise<AxiosResponse<void>> {
  return axios.post(`${baseApiUrl}/user`, userPayload, { timeout: 7500, withCredentials: true });
}

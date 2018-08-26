import axios, { AxiosResponse } from 'axios'
import { AuthState } from '../../shared/dto/auth'

const baseApiUrl = `${window.location.protocol}//${window.location.host}/api`;

export async function getAuthState(): Promise<AxiosResponse<AuthState>> {
  return axios.get<AuthState>(`${baseApiUrl}/auth/state`, { timeout: 7500, withCredentials: true });
}

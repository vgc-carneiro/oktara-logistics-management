/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosInstance, AxiosResponse } from 'axios'

export const client: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

export class ServiceConfig {
  public async get<T, B, R = AxiosResponse<T>>(url: string): Promise<R> {
    try {
      return await client.get(url)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async post<T, B, R = AxiosResponse<T>>(url: string, data?: B): Promise<R> {
    try {
      return await client.post(url, data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public async patch<T, B, R = AxiosResponse<T>>(url: string, data?: B): Promise<R> {
    try {
      return await client.patch(url, data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default new ServiceConfig()

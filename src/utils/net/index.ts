import Request from './request'
import { ConsoleResponse } from '@/types/console-response'

const request = new Request({
  timeout: 30000,
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    },
  },
})

export class Api {
  static getConsoleList() {
    return request.get<Array<ConsoleResponse>>({ url: '/data/console.json' })
  }
}

export { request }

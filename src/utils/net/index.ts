import Request from './request'
import { ConsoleResponse } from '@/types/console-response'
import { GameResponse } from '@/types/game-response'
import { EmulatorResponse } from '@/types/emulator-response'

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

  static getEmuList() {
    return request.get<Array<EmulatorResponse>>({
      url: '/data/emulator.json',
    })
  }

  static getGameData(type: string) {
    return request.get<Array<GameResponse>>({
      url: `/data/console/${type}.json`,
    })
  }
}

export { request }

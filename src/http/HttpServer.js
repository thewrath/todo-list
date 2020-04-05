'use strict'

export default class HttpServer {
  constructor (params) {
    if (this.constructor === HttpServer) {
      throw new TypeError('HttpServer class "AbstractConfig" cannot be instantiated directly')
    }
    this.params = params
  }

  async start () {

  }

  registerRoutes () {

  }
}

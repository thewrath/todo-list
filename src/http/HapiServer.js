'use strict'

import HttpServer from './HttpServer'
import Hapi from '@hapi/hapi'

export default class HapiServer extends HttpServer {
  constructor (params) {
    super(params)
    this.hapiServer = Hapi.server(this.params)
  }

  async start () {
    await this.hapiServer.register({
      plugin: require('hapi-cors'),
      options: {
        origins: ['*']
      }
    })
    await this.hapiServer.start()
    console.log('Server running on %s', this.hapiServer.info.uri)
  }

  /**
   * @method registerRoutes
   * @description register all describe in the configuration array (routes param) 
   */
  registerRoutes (routes) {
    routes.forEach(route => {
      this.hapiServer.route(route)
    })
  }
}

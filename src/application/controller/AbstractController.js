'use strict'

export default class AbstractController {
  constructor () {
    if (this.constructor === AbstractController) {
      throw new TypeError('AbstractController class "AbstractConfig" cannot be instantiated directly')
    }
    this.routes = []
  }

  /**
   * @method _generateResponse
   * @description generate a ready to send HTTP response 
   */
  _generateResponse (h, statusCode, view) {
    return h.response(view.generateOutput()).code(statusCode)
  }
}

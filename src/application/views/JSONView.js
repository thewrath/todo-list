'use strict'
import AbstractView from './AbstractView'
import ApiError from '../model/ApiError'

export default class JSONView extends AbstractView {

  /**
   * @method generateOutput
   * @description generate JSON output that respect the JSON Jsend API format https://github.com/omniti-labs/jsend 
   */
  generateOutput () {
    if (this.model != null) {
      if (this.model instanceof ApiError) {
        return {
          status: 'error',
          message: this.model.message
        }
      } else {
        return {
          status: 'success',
          data: this.model
        }
      }
    } else {
      return {
        status: 'success'
      }
    }
  }
}

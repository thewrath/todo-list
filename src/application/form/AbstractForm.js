'use strict'

import ApiError from '../model/ApiError'

export default class AbstractForm {
  constructor (params) {
    if (this.constructor === AbstractForm) {
      throw new TypeError('AbstractForm class "AbstractConfig" cannot be instantiated directly');
    }
    if (params == null) {
      throw new Error('Input params cannot be null')
    }
    this.params = params
    this.expectedParams = []
    this.error = null
  }

  isValid () {
    let noError = true
    this.expectedParams.forEach(param => {
      // hasOwnProperty cannot be used here because request.payload/query from Hapi doesn't inherit from JS Object base class (so hasOwnProperty doesn't exists)
      // https://stackoverflow.com/questions/53978067/hasownproperty-is-not-a-function-in-node-js
      if (!Object.prototype.hasOwnProperty.call(this.params, param)) {
        noError = false
        this.error = new ApiError('Field is missing', `Field ${param} is missing`)
      }
    })
    return noError
  }
}

'use strict'

export default class AbstractView {
  constructor (model) {
    if (this.constructor === AbstractView) {
      throw new TypeError('AbstractView class "AbstractConfig" cannot be instantiated directly')
    }
    this.model = model
  }

  generateOutput () {
    throw new Error('Cannot use abstract view to generate HTTP Response')
  }
}

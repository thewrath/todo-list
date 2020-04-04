'use strict'

export default class AbstractFilter {
  constructor (model) {
    if (this.constructor === AbstractFilter) {
      throw new TypeError('AbstractFilter class "AbstractConfig" cannot be instantiated directly');
    }
    this.model = model
  }

  _filter (entrie) {

  }

  reduce (entries) {
    if (Array.isArray(entries)) {
      return entries.filter((entry) => {
        return this._filter(entry)
      })
    } else {
      return this._filter(entries)
    }
  }
}

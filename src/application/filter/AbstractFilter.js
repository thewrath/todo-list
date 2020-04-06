'use strict'

export default class AbstractFilter {
  constructor (model) {
    if (this.constructor === AbstractFilter) {
      throw new TypeError('AbstractFilter class "AbstractConfig" cannot be instantiated directly')
    }
    this.model = model
  }

  /**
   * @method _filter
   * @description method to put in the array.filter JS method 
   */
  _filter (entrie) {

  }

  /**
   * @method reduce
   * @description method that reduce an array with the given filter 
   * (take an array and return an array with only elements that match the filter)
   */
  reduce (entries) {
    // Check if entries is an array, else we apply the filter directly (on one element)
    if (Array.isArray(entries)) {
      return entries.filter((entry) => {
        return this._filter(entry)
      })
    } else {
      return this._filter(entries)
    }
  }
}

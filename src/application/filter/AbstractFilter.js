'use strict'

export default class AbstractFilter {
  constructor (model) {
    this.model = model
  }

  _filter (entrie) {

  }

  reduce (entries) {
    if (Array.isArray(entries)) {
      return entries.filter((entry) => {
        this._filter(entry)
      })
    } else {
      return this._filter(entries)
    }
  }
}

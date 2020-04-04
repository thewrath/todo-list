'use strict'

import AbstractFilter from './AbstractFilter'
import Task from '../model/Task'

export default class TaskFilter extends AbstractFilter {
  constructor (taskModel) {
    super(taskModel)
    if (!(taskModel instanceof Task)) {
      throw new Error('TaskFilter works only with Task object')
    }
  }

  _filter (entrie) {
    // Check title (most restrictive)
    if (this.model.title !== undefined && entrie.title !== this.model.title) {
      return false
    }
    // Check if it's good status
    if (this.model.statut !== undefined && entrie.statut !== this.model.statut) {
      return false
    }
    // Check if dates are in range of filter dates
    if (this.model.dateBegin !== undefined && this.model.dateEnd !== undefined && !(Date.parse(entrie.dateBegin) >= Date.parse(this.model.dateBegin) && Date.parse(entrie.dateEnd) <= Date.parse(this.model.dateEnd))) {
      return false
    }

    // Check if contains tags
    const containsAll = (arr, target) => target.every(v => arr.includes(v))
    if (this.model.tags !== undefined && !(containsAll(this.model.tags.split(','), entrie.tags.split(',')))) {
      return false
    }

    return true
  }
}

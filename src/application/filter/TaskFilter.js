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
    if (this.model.title !== undefined && this.model.title !== null && this.model.title.trim() !== '') {
      if (entrie.title !== this.model.title) {
        return false
      }
    }
    return true
  }
}

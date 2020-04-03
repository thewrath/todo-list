'use strict'

import AbstractFilter from './AbstractFilter'
import Task from '../model/Task'

export default class TaskFilter extends AbstractFilter {
  constructor (taskModel) {
    super(taskModel)
    if (!(this.taskModel instanceof Task)) {
      throw new Error('TaskFilter works only with Task object')
    }
  }

  _filter (entrie) {
    if (this.taskModel.title !== undefined && this.taskModel.title !== null && this.taskModel.title.trim() !== '') {
      if (entrie.title !== this.taskModel.title) {
        return false
      }
    }
    return true
  }
}

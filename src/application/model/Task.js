'use strict'

export default class Task {
  constructor (id) {
    this.id = id
    this.title = ''
    this.dateBegin = ''
    this.dateEnd = ''
    this.statut = 0
    this.tags = ''
  }

  static fromJson (json) {
    const task = new Task(null)
    for (const property in task) {
      task[property] = json[property]
    }
    return task
  }
}

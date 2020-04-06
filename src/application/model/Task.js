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

  /**
   * @method fromJSON
   * @description create new Task from JSON input 
   */
  static fromJson (json) {
    const task = new Task(null)
    for (const property in task) {
      task[property] = json[property]
    }
    return task
  }

  /**
   * @method combine
   * @description Create new task with property of the first part in priority and supplement with second part if needed
   */
  static combine (first, second) {
    const task = Task.fromJson(first)
    for (const property in second) {
      if (task[property] === undefined) {
        task[property] = second[property]
      }
    }

    return task
  }
}

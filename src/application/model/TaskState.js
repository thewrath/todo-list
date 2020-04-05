'use strict'

export default class TaskState {
  constructor (id, name) {
    this.id = id
    this.name = name
  }

  static fromJson (json) {
    const taskState = new TaskState(null, null)
    for (const property in taskState) {
      taskState[property] = json[property]
    }
    return taskState
  }
}

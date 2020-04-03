'use strict'

export default class TaskState {
  constructor (id, value) {
    this.id = id
    this.value = value
  }

  static fromJson (json) {
    const taskState = new TaskState(null, null)
    for (const property in taskState) {
      taskState[property] = json[property]
    }
    return taskState
  }
}

'use strict'

import TaskState from '../model/TaskState'

export default class TaskStateDAO {
  constructor () {
    this.id = 0
    this.tasks = [
      new TaskState(this.id++, 'Non precisé'),
      new TaskState(this.id++, 'Une tâche est requise'),
      new TaskState(this.id++, 'En cours'),
      new TaskState(this.id++, 'Achevée'),
      new TaskState(this.id++, 'Annulée')
    ]
  }

  readTasks () {
    return this.tasks
  }
}

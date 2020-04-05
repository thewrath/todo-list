'use strict'

export default class TaskStateDAO {
  constructor (connector) {
    this.db = connector.db
  }

  async readTasks () {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM TaskState', [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  }
}

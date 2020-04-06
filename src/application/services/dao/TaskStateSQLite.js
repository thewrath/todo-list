'use strict'

export default class TaskStateDAO {
  constructor (connector) {
    this.db = connector.db
  }

  /**
   * @method readTaskStates
   * @description return all entries in the TaskStates table of the SQLite Database 
   */
  async readTaskStates () {
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

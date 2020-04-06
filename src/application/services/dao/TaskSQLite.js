'use strict'

export default class TaskDAO {
  constructor (connector) {
    this.db = connector.db
  }

  /**
   * @method createTask
   * @description insert new task in SQLite Database 
   */
  async createTask (task) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare('INSERT INTO Task(title, dateBegin, dateEnd, statut, tags) VALUES (?, ?, ?, ?, ?)', (err) => {
          if (err) {
            reject(err)
          } else {
            stmt.run(task.title, task.dateBegin, task.dateEnd, task.statut, task.tags, (err) => {
              if (err) {
                reject(err)
              }
              stmt.finalize()
              task.id = this.db.lastInsertRowId
              resolve(task)
            })
          }
        })
      })
    })
  }

  /**
   * @method readTasks
   * @description return all entries of Task table in the SQLite Database 
   */
  async readTasks () {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM Task', [], (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  }

  /**
   * @method readTask
   * @description return entry that match the id give in parameters if exists 
   */
  async readTask (id) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare('SELECT * FROM Task WHERE id=?', (err) => {
          if (err) {
            reject(err)
          } else {
            stmt.each(id, (err, row) => {
              if (err) {
                reject(err)
              }
              resolve(row)
            }, (err, count) => {
              if (err) {
                reject(err)
              }
              stmt.finalize()
              resolve(null)
            })
          }
        })
      })
    })
  }

  /**
   * @method updateTask
   * @description update entry in Task table that conresponding to the given id 
   */
  async updateTask (task) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        const stmt = this.db.prepare('UPDATE Task SET title = ?, dateBegin = ?, dateEnd = ? , statut = ?, tags = ? WHERE id = ?', (err) => {
          if (err) {
            reject(err)
          } else {
            stmt.run(task.title, task.dateBegin, task.dateEnd, task.statut, task.tags, task.id)
            stmt.finalize()
            resolve(task)
          }
        })
      })
    })
  }

  /**
   * @method deleteTask
   * @description delete entry in Task table that conresponding to the given id 
   */
  async deleteTask (id) {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare('DELETE FROM Task WHERE id=?', (err) => {
        if (err) {
          reject(err)
        } else {
          stmt.run(id)
          stmt.finalize()
          resolve()
        }
      })
    })
  }

  /**
   * @method close
   * @description close database access 
   */
  close () {
    this.db.close()
  }
}

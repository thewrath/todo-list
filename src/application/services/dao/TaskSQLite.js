'use strict'

export default class TaskDAO {
  constructor (connector) {
    this.db = connector.db;
  }

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

  close () {
    this.db.close()
  }
}

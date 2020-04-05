import sqlite3 from 'sqlite3'

export default class SQLiteConnector {
    constructor(filename){
        this.db = new sqlite3.Database(filename, (err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log(`Connected to the ${filename} SQlite database.`)
            this._initialize()
          })
    }

    _initialize () {
        this.db.run('CREATE TABLE IF NOT EXISTS TaskState (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)')
        this.db.run('CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, dateBegin TEXT, dateEnd TEXT, statut INTEGER, tags TEXT, FOREIGN KEY(statut) REFERENCES TaskState(id))')
        this.db.get("PRAGMA foreign_keys = ON")
    }
}
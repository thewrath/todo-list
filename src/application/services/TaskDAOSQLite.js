'use strict'
import sqlite3 from 'sqlite3'

export default class TaskDAO {
    constructor(filename) {
        this.db = new sqlite3.Database(filename,(err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log(`Connected to the ${filename} SQlite database.`);
            this._initialize();
        });
    }

    _initialize() {
        this.db.run("CREATE TABLE IF NOT EXISTS Task (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, dateBegin TEXT, dateEnd TEXT, statut INTEGER, tags TEXT)");
    }

    async createTask(task) {
        await this.db.serialize(() => {
            let stmt = this.db.prepare("INSERT INTO Task(title, dateBegin, dateEnd, statut, tags) VALUES (?, ?, ?, ?, ?)");
            stmt.run(task.title, task.dateBegin, task.dateEnd, task.statut, "");
            stmt.finalize();
        });
        task.id = this.db.lastInsertRowId;
        return task;
    }

    async readTasks() {
        return null;
    }

    async readTask(id) {
        return null;      
    }

    async updateTask(task) {
        return null;
    }

    async deleteTask(id) {
        return null;
    }

    close() {
        this.db.close()
    }
}
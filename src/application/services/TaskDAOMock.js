'use strict'

import Task from '../model/Task'

export default class TaskDAO {

    constructor() {
        this.id = 0;
        this.tasks = [new Task(this.id++), new Task(this.id++)];
    }
    
    createTask(task) {
        task.id = this.id++;
        this.tasks.push(task);
        return task;
    }

    readTasks() {
        return this.tasks;
    }

    readTask(id) {
        let task = null;
        this.tasks.forEach(t => {
            if(t.id == id) {
                task = t;
                return; 
            }
        });

        return task;
    }

    updateTask(task) {
        let find = false;
        this.tasks.forEach(t => {
            if(t.id == id) {
                t = task;
                find = true;
                return; 
            }
        });

        return find;
    }

    deleteTask(id) {
        const taskSizeBefore = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id != id);
        if (taskSizeBefore > this.tasks.length) {
            return true;
        } else {
            return false;
        }
    }

}
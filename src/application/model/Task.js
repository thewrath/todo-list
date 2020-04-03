'use strict'

export default class Task {

    constructor(id) {
        this.id = id;  
        this.title = "";
        this.dateBegin = "";
        this.dateEnd = "";
        this.statut = 0;
        this.tags = "";
    }

    static fromJson(json) {
        let task = new Task(null);
        for(let property in task) {
            task[property] = json[property];
        }
        return task;
    }
}
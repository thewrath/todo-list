'use strict'

export default class TaskState {

    constructor(id, value) {
        this.id = id;  
        this.value = value;
    }

    static fromJson(json) {
        let taskState = new TaskState(null, null);
        for(let property in taskState) {
            taskState[property] = json[property];
        }
        return taskState;
    }
}
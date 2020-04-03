'use strict'

import AbstractFilter from './AbstractFilter';

export default class TaskFilter extends AbstractFilter {
    constructor(taskModl) {
        if(taskModel instanceof TaskModel){
            this.taskModel = taskModel;
        }else {
            throw error("TaskFilter works only with TaskModel object");
        }
    }

    _filter(entrie){
        if(taskModel.title != undefined && taskModel.title != null && taskModel.title.trim() != ""){
            if(entrie.title != this.taskModel.title) {
                return false;
            }
        }
        return true;
    }
}
'use strict'

import AbstractController from "./AbstractController";
import JSONView from "../views/JSONView";
import Task from "../model/Task";

export default class TaskController extends AbstractController {

    getTask(request, h) {
        return (new JSONView(new Task())).generateOutput();
    }

    getTasks(request, h) {
        const tasks = [new Task(), new Task()];
        return (new JSONView(tasks)).generateOutput();
    }

    postTask(request, h) {

    }

    putTask(request, h) {

    }

    deleteTask(request, h) {

    }
}

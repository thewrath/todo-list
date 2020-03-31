'use strict'

import AbstractController from "./AbstractController";
import JSONView from "../views/JSONView";

export default class TaskStateController extends AbstractController {

    constructor(taskStateDAO) {
        super();
        this.taskStateDAO = taskStateDAO;
    }

    getTaskStates(request, h) {
        const taskStates = this.taskStateDAO.readTasks();
        return this.sendResponse(h, 200, new JSONView(taskStates))
    }
}

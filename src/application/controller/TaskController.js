'use strict'

import AbstractController from "./AbstractController";
import JSONView from "../views/JSONView";
import Task from "../model/Task";
import TaskForm from "../form/TaskForm";

import ApiError from "../model/ApiError";

export default class TaskController extends AbstractController {

    constructor(taskDAO) {
        super();
        this.taskDAO = taskDAO;
    }

    async getTask(request, h) {
        const id = request.params.id;
        const task = this.taskDAO.readTask(id);
        if(task != null) {
            return this.sendResponse(h, 200, new JSONView(task))
        } else {
            return this.sendResponse(h, 404, new JSONView(new ApiError("Task not found", `Task with id ${id} not found`)))
        }
    }

    async getTasks(request, h) {
        const tasks = this.taskDAO.readTasks();
        return this.sendResponse(h, 200, new JSONView(tasks))
    }

    async postTask(request, h) {
        const taskForm = new TaskForm(request.payload);
        if(taskForm.isValid()){
            const newTask = Task.fromJson(request.payload);
            const DAOResult = await this.taskDAO.createTask(newTask);
            return this.sendResponse(h, 200, new JSONView(DAOResult));
        }
        return this.sendResponse(h, 400, new JSONView(taskForm.error));
    }

    async putTask(request, h) {
        const taskForm = new TaskForm(request.payload);
        if(taskForm.isValid()){
            const newTask = Task.fromJson(request.payload);
            return this.sendResponse(h, 200, new JSONView(this.taskDAO.updateTask(newTask)));
        }
        return this.sendResponse(h, 400, new JSONView(taskForm.error));
    }

    async deleteTask(request, h) {
        const id = request.params.id;
        if(this.taskDAO.deleteTask(id)){
            return this.sendResponse(h, 200, new JSONView());
        }
        return this.sendResponse(h, 404, new JSONView(new ApiError("Task not found", `Task with id ${id} not found`)));
    }
}

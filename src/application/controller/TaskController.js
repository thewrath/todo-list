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
        try {
            const task = await this.taskDAO.readTask(id);
            if(task != null) {
                return this.sendResponse(h, 200, new JSONView(task))
            } else {
                return this.sendResponse(h, 404, new JSONView(new ApiError("Task not found", `Task with id ${id} not found`)))
            }
        } catch (err) {
            return this.sendResponse(h, 500, new JSONView(new ApiError("SQL Error", "SQL Error on SELECT")));
        }
        
    }

    async getTasks(request, h) {
        try {
            const tasks = await this.taskDAO.readTasks();
            return this.sendResponse(h, 200, new JSONView(tasks))
        } catch (err) {
            return this.sendResponse(h, 500, new JSONView(new ApiError("SQL Error", "SQL Error on SELECT")));
        }
    }

    async postTask(request, h) {
        const taskForm = new TaskForm(request.payload);
        if(taskForm.isValid()){
            const newTask = Task.fromJson(request.payload);
            try{
                const DAOResult = await this.taskDAO.createTask(newTask);
                return this.sendResponse(h, 200, new JSONView(DAOResult));
            } catch {
                return this.sendResponse(h, 500, new JSONView(new ApiError("SQL Error", "SQL Error on INSERT")));
            }
        }
        return this.sendResponse(h, 400, new JSONView(taskForm.error));
    }

    async putTask(request, h) {
        const id = request.params.id;
        const taskForm = new TaskForm(request.payload);
        if(taskForm.isValid()){
            const newTask = Task.fromJson(request.payload);
            newTask.id = id;
            try {
                await this.taskDAO.updateTask(newTask)
                return this.sendResponse(h, 200, new JSONView(newTask));
            } catch (err) {
                return this.sendResponse(h, 500, new JSONView(new ApiError("SQL Error", "SQL Error on UPDATE")))
            }
        }
        return this.sendResponse(h, 400, new JSONView(taskForm.error));
    }

    async deleteTask(request, h) {
        const id = request.params.id;
        try {
            await this.taskDAO.deleteTask(id);
            return this.sendResponse(h, 200, new JSONView());
        } catch(err) {
            console.error(err)
            return this.sendResponse(h, 404, new JSONView(new ApiError("Task not found", `Task with id ${id} not found`)));
        }
    }
}

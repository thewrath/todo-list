'use strict'

import AbstractController from './AbstractController'
import JSONView from '../views/JSONView'
import Task from '../model/Task'
import TaskForm from '../form/TaskForm'
import ApiError from '../model/ApiError'
import TaskFilter from '../filter/TaskFilter'

export default class TaskController extends AbstractController {
  constructor (taskDAO) {
    super()
    this.taskDAO = taskDAO
  }

  async getTask (request, h) {
    const id = request.params.id
    try {
      const task = await this.taskDAO.readTask(id)
      if (task != null) {
        return this.sendResponse(h, 200, new JSONView(task))
      } else {
        return this.sendResponse(h, 404, new JSONView(new ApiError('Task not found', `Task with id ${id} not found`)))
      }
    } catch (err) {
      return this.sendResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  async getTasks (request, h) {
    try {
      let tasks = await this.taskDAO.readTasks()
      try {
        tasks = (new TaskFilter(Task.fromJson(request.query))).reduce(tasks)
      } catch (err) {
        // Error here is only when no params are in inputs, so there is nothing
      }
      return this.sendResponse(h, 200, new JSONView(tasks))
    } catch (err) {
      return this.sendResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  async postTask (request, h) {
    const taskForm = new TaskForm(request.payload)
    if (taskForm.isValid()) {
      const newTask = Task.fromJson(request.payload)
      try {
        const DAOResult = await this.taskDAO.createTask(newTask)
        return this.sendResponse(h, 200, new JSONView(DAOResult))
      } catch (err) {
        return this.sendResponse(h, 500, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
      }
    }
    return this.sendResponse(h, 400, new JSONView(taskForm.error))
  }

  async putTask (request, h) {
    const id = request.params.id
    try {
      const lastTask = await this.taskDAO.readTask(id)
      const newTask = Task.combine(request.payload, lastTask)
      // Persist updated task
      await this.taskDAO.updateTask(newTask)
      return this.sendResponse(h, 200, new JSONView(newTask))
    } catch (err) {
      return this.sendResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  async deleteTask (request, h) {
    const id = request.params.id
    try {
      await this.taskDAO.deleteTask(id)
      return this.sendResponse(h, 200, new JSONView())
    } catch (err) {
      console.error(err)
      return this.sendResponse(h, 404, new JSONView(new ApiError('Task not found', `Task with id ${id} not found`)))
    }
  }
}

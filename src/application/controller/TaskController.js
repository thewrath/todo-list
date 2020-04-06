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

  /**
   * @method getTask
   * @description handler for get request, return task that match id in query params 
   */
  async getTask (request, h) {
    const id = request.params.id
    try {
      const task = await this.taskDAO.readTask(id)
      if (task != null) {
        return this._generateResponse(h, 200, new JSONView(task))
      } else {
        return this._generateResponse(h, 404, new JSONView(new ApiError('Task not found', `Task with id ${id} not found`)))
      }
    } catch (err) {
      return this._generateResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  /**
   * @method getTasks
   * @description handler for get request return all task that match the filter
   */
  async getTasks (request, h) {
    try {
      let tasks = await this.taskDAO.readTasks()
      try {
        tasks = (new TaskFilter(Task.fromJson(request.query))).reduce(tasks)
      } catch (err) {
        // Error here is only when no params are in inputs, so there is nothing
      }
      return this._generateResponse(h, 200, new JSONView(tasks))
    } catch (err) {
      console.log(err)
      return this._generateResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  /**
   * @method postTask
   * @description handler for post request, create a new task, persist it and return it 
   */
  async postTask (request, h) {
    const taskForm = new TaskForm(request.payload)
    if (taskForm.isValid()) {
      const newTask = Task.fromJson(request.payload)
      try {
        const DAOResult = await this.taskDAO.createTask(newTask)
        return this._generateResponse(h, 200, new JSONView(DAOResult))
      } catch (err) {
        return this._generateResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
      }
    }
    return this._generateResponse(h, 400, new JSONView(taskForm.error))
  }

  /**
   * @method putTask
   * @description handler for put request, update the task that corresponding to the id 
   */
  async putTask (request, h) {
    const id = request.params.id
    try {
      const lastTask = await this.taskDAO.readTask(id)
      const newTask = Task.combine(request.payload, lastTask)
      // Persist updated task
      await this.taskDAO.updateTask(newTask)
      return this._generateResponse(h, 200, new JSONView(newTask))
    } catch (err) {
      return this._generateResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }

  /**
   * @method deleteTask
   * @description handler for delete request, remove the task that corresponding to the id 
   */
  async deleteTask (request, h) {
    const id = request.params.id
    try {
      await this.taskDAO.deleteTask(id)
      return this._generateResponse(h, 200, new JSONView())
    } catch (err) {
      console.error(err)
      return this._generateResponse(h, 404, new JSONView(new ApiError('Task not found', `Task with id ${id} not found`)))
    }
  }
}

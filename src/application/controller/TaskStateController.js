'use strict'

import AbstractController from './AbstractController'
import JSONView from '../views/JSONView'

export default class TaskStateController extends AbstractController {
  constructor (taskStateDAO) {
    super()
    this.taskStateDAO = taskStateDAO
  }

  getTaskStates (request, h) {
    try {
      const taskStates = this.taskStateDAO.readTasks()
      return this.sendResponse(h, 200, new JSONView(taskStates))
    } catch(err){
      return this.sendResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }
}

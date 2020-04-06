'use strict'

import AbstractController from './AbstractController'
import JSONView from '../views/JSONView'
import ApiError from '../model/ApiError'

export default class TaskStateController extends AbstractController {
  constructor (taskStateDAO) {
    super()
    this.taskStateDAO = taskStateDAO
  }

  /**
   * @method getTaskStates
   * @description handler for get request, return all task states 
   */
  async getTaskStates (request, h) {
    try {
      const taskStates = await this.taskStateDAO.readTaskStates()
      return this._generateResponse(h, 200, new JSONView(taskStates))
    } catch (err) {
      return this._generateResponse(h, 400, new JSONView(new ApiError('Request error', 'this request cannot be successful check your settings')))
    }
  }
}

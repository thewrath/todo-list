'use strict'

import AbstractForm from './AbstractForm'
import Task from '../model/Task'
import ApiError from '../model/ApiError'

export default class TaskForm extends AbstractForm {
  constructor (params) {
    super(params)
    for (var key in (new Task())) {
      if (key !== 'id') {
        this.expectedParams.push(key)
      }
    }
  }

  isValid () {
    let noError = true
    this.expectedParams.forEach(param => {
      if (!this.params.hasOwnProperty(param)) {
        noError = false
        this.error = new ApiError('Field is missing', `Field ${param} is missing`)
      }
    })
    if (noError === true) {
      if (this.params.title.trim() === '') {
        noError = false
        this.error = new ApiError('Invalid field', 'title field cannot be blank')
      }
      if (isNaN(this.params.statut)) {
        noError = false
        this.error = new ApiError('Invalid field', 'statut field need to be a number')
      }
    }
    return noError
  }
}

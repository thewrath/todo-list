import Controllers from './Controllers'

export default [
  { method: 'GET', path: '/task/state', handler: Controllers.taskStateController.getTaskStates.bind(Controllers.taskStateController) },

  { method: 'POST', path: '/task', handler: Controllers.taskController.postTask.bind(Controllers.taskController) },
  { method: 'GET', path: '/task', handler: Controllers.taskController.getTasks.bind(Controllers.taskController) },
  { method: 'GET', path: '/task/{id}', handler: Controllers.taskController.getTask.bind(Controllers.taskController) },
  { method: 'PUT', path: '/task/{id}', handler: Controllers.taskController.putTask.bind(Controllers.taskController) },
  { method: 'DELETE', path: '/task/{id}', handler: Controllers.taskController.deleteTask.bind(Controllers.taskController) }
]

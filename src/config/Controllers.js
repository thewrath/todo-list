import Services from './Services'
import TaskController from '../application/controller/TaskController'
import TaskStateController from '../application/controller/TaskStateController'

export default {
  taskController: new TaskController(Services.taskDAO),
  taskStateController: new TaskStateController(Services.taskStateDAO)
}

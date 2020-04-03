import path from 'path'
import TaskDAO from '../application/services/TaskDAOSQLite'
import TaskStateDAO from '../application/services/TaskStateDAOMock'

export default {
  taskDAO: new TaskDAO(path.resolve(__dirname, '../../datas/database.db')),
  taskStateDAO: new TaskStateDAO()
}

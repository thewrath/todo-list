import path from 'path'
import SQLiteConnector from '../application/services/SQLiteConnector'
import TaskDAO from '../application/services/dao/TaskSQLite'
import TaskStateDAO from '../application/services/dao/TaskStateSQLite'

// Private services for services injection only
const _privateServices = {
  sqliteConnector: new SQLiteConnector(path.resolve(__dirname, '../../datas/database.db'))
}

// Public services are available for controllers injection
export default {
  taskDAO: new TaskDAO(_privateServices.sqliteConnector),
  taskStateDAO: new TaskStateDAO(_privateServices.sqliteConnector)
}

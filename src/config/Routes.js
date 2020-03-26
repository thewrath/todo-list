import Controllers from './Controllers';

export default [
    { method: "POST", path: "/task", handler: Controllers.taskController.postTask },
    { method: "GET", path: "/task", handler: Controllers.taskController.getTasks },
    { method: "GET", path: "/task/{id}", handler: Controllers.taskController.getTask },
    { method: "PUT", path: "/task/{id}", handler: Controllers.taskController.putTask },
    { method: "DELETE", path: "/task/id", handler: Controllers.taskController.deleteTask }
]

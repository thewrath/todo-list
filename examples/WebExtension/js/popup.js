const todoApi = {
  url: 'http://localhost',
  port: 3000
}

// Task states
var taskStates = []
var stateColors = ['w3-blue', 'w3-orange', 'w3-purple', 'w3-light-green', 'w3-red']

// Async form submission
document.addEventListener('submit', e => {
  const form = e.target

  fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  }).then((response) => {
    response.json().then((res) => {
      if (res.status === 'success') {
        document.getElementById('new-task-error').style.display = 'none'
        refreshTasks()
      } else if (res.status === 'error') {
        document.getElementById('new-task-error').innerText = res.message
        document.getElementById('new-task-error').style.display = 'block'
      }
    })
  })

  e.preventDefault()
})

const deleteTask = async (id) => {
  return fetch(`${todoApi.url}:${todoApi.port}/task/${id}`, { method: 'DELETE' }).then((response) => {
    refreshTasks()
    return response.json()
  })
}

const findTaskStates = async () => {
  return fetch(`${todoApi.url}:${todoApi.port}/task/state`).then((response) => {
    return response.json()
  })
}

const refreshTaskDeleteButtonListeners = () => {
  const taskDeleteButtons = document.getElementsByClassName('task-delete-button')
  for (var i = 0; i < taskDeleteButtons.length; i++) {
    ((index) => {
      taskDeleteButtons[index].addEventListener('click', () => { deleteTask(taskDeleteButtons[index].id) })
    })(i)
  }
}

const findTasks = async () => {
  return fetch(`${todoApi.url}:${todoApi.port}/task`).then((response) => {
    return response.json()
  })
}

const addTask = (task) => {
  const li = document.createElement('li')
  li.setAttribute('class', 'w3-display-container w3-hover-gray task-entry')
  li.innerHTML = `<div class="w3-cell" title="${task.tags}"> <span class="w3-tag ${stateColors[task.statut]}">${taskStates[task.statut]}</span> ${task.title} </div> <button class="task-delete-button  w3-button w3-display-right" id="${task.id}">&times;</button>`
  document.getElementById('task-list').appendChild(li)
}

const refreshTaskStates = () => {
  findTaskStates().then((response) => {
    if (response.status === 'success') {
      response.data.forEach(taskState => {
        taskStates[taskState.id] = taskState.name
      })
    }
  })
}

const refreshTasks = () => {
  document.getElementById('task-list').innerHTML = ''
  findTasks().then((response) => {
    if (response.status === 'success') {
      response.data.forEach(task => {
        addTask(task)
      })
      refreshTaskDeleteButtonListeners()
    }
  })
}

refreshTaskStates()
refreshTasks()

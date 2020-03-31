const todoApi = {
    url: 'http://localhost',
    port: 3000
};
// Task states
var taskStates = []

// Async form submission
document.addEventListener('submit', e => {
    
    // Store reference to form to make later code easier to read
    const form = e.target;
    
    // Post data using the Fetch API
    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    }).then((response) => {
        response.json().then((data) => {
            if(data.statusCode == 200) {
                document.getElementById('new-task-error').style.display = "none";
                addTask(data.payload);
            } else {
                document.getElementById('new-task-error').innerText = data.message;
                document.getElementById('new-task-error').style.display = "block";
            }
        })
    });
    
    // Prevent the default form submit
    e.preventDefault();

});


let deleteTask = (id) => {
    return fetch(`${todoApi.url}:${todoApi.port}/task/${id}`, {method: "DELETE"}).then((response) => {
        return response.json();
    });
};

let findTaskStates = async () => {
    return fetch(`${todoApi.url}:${todoApi.port}/task/state`).then((response) => {
        return response.json();
    });
};

let findTasks = async () => {
    return fetch(`${todoApi.url}:${todoApi.port}/task`).then((response) => {
        return response.json();
    });
};

let addTask = (task) => {
    let li = document.createElement("li");
    li.setAttribute("class", "w3-display-container w3-hover-gray task-entry");
    let deleteCb = function() { deleteTask(task.id); refreshTasks() };
    li.innerHTML = `<span class="w3-tag">${taskStates[task.statut]}</span> ${task.title}  <span class="w3-button w3-display-right" onclick="${deleteCb}">&times;</span>`
    document.getElementById("task-list").appendChild(li);
}

let refreshTaskStates = () => {
    findTaskStates().then((response) => {
        if(response.statusCode == 200) {
            response.payload.forEach(taskState => {
                taskStates[taskState.id] = taskState.value;
            });
        }
    });
}

let refreshTasks = () => {
    document.getElementById("task-list").innerHTML = "";
    findTasks().then((response) => {
        if(response.statusCode == 200) {
            response.payload.forEach(task => {
                console.error("New task");
                addTask(task);
            });
        }
    });
}

refreshTaskStates();
refreshTasks();
  
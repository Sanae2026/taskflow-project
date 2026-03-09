const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");

let tasks = [];

// Cargar tareas guardadas
document.addEventListener("DOMContentLoaded", function(){

    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTask(task));
    }

});

// Añadir tarea
form.addEventListener("submit", function(e){

    e.preventDefault();

    const taskText = input.value.trim();

    const task = {
    text: taskText,
    priority: priority.value
    };

    if(taskText === "") return;
    
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(task);

    input.value = "";

});


// Crear tarea en el DOM
function createTask(task){

const li = document.createElement("li");

li.classList.add(task.priority);

const span = document.createElement("span");
span.textContent = task.text + " (" + task.priority + ")";

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Eliminar";

deleteBtn.addEventListener("click", function(){

li.remove();

tasks = tasks.filter(t => t.text !== task.text);

localStorage.setItem("tasks", JSON.stringify(tasks));

});

li.appendChild(span);
li.appendChild(deleteBtn);

taskList.appendChild(li);

}
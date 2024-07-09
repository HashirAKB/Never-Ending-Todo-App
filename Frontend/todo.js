// todo.js

// Cache frequently accessed elements
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const todoContainer = document.getElementById("dispTodos");
const submitButton = document.getElementById("btn-submit");

function getTodoItem(item) {
    return document.querySelector(`[data-item-id="${item}"]`);
}

function updateTodo(item) {
    const todoItem = getTodoItem(item);
    if (!todoItem) return;
    toggleContentEditable(todoItem, false);
    toggleButtonText(todoItem, "Edit");
    toggleButtonClass(todoItem, 'updateTodo', 'editTodo');
}

function editTodo(item){
    const todoItem = getTodoItem(item);
    if (!todoItem) return;
    toggleContentEditable(todoItem, true);
    toggleButtonText(todoItem, "Update");
    toggleButtonClass(todoItem, 'editTodo', 'updateTodo');
}

function removeItem(item){
    const todoItem = getTodoItem(item);
    if (!todoItem) return;
    todoContainer.removeChild(todoItem.parentElement);
}

function markAsDone(item){
    const todoItem = getTodoItem(item);
    if (!todoItem) return;
    toggleTextDecoration(todoItem, "line-through");
    toggleButtonText(todoItem, 'Remove');
    toggleButtonClass(todoItem, 'markAsDone', 'removeItem');
}

function toggleContentEditable(element, editable) {
    const children = element.parentElement.children;
    children[0].contentEditable = editable;
    children[1].contentEditable = editable;
}

function toggleButtonText(element, text) {
    element.innerText = text;
}

function toggleTextDecoration(element, style) {
    const children = element.parentElement.children;
    children[0].style.textDecoration = style;
    children[1].style.textDecoration = style;
}

function toggleButtonClass(element, removeClass, addClass) {
    element.classList.remove(removeClass);
    element.classList.add(addClass);
}

function disableSubmitButton() {
    submitButton.disabled = true;
}

function enableSubmitButton() {
    submitButton.disabled = false;
}

function createTodoElement(item, itemDesc) {
    const todo = document.createElement("div");
    todo.classList.add("todo-item"); // Add todo-item class to the container div

    // Create todo text element
    const todoText = document.createElement("div");
    todoText.textContent = item;
    todoText.classList.add("todo-text", "todo-title"); // Add todo-text class
    todo.appendChild(todoText);

    // Create todo description element
    const todoDesc = document.createElement("div");
    todoDesc.textContent = itemDesc;
    todoDesc.classList.add("todo-description");
    todo.appendChild(todoDesc);

    const padding = document.createElement("br");
    todo.appendChild(padding);

    // Create "Mark As Done" button
    const markAsDoneBtn = document.createElement("button");
    markAsDoneBtn.textContent = "Mark As Done";
    markAsDoneBtn.classList.add("markAsDone"); // Add markAsDone class
    markAsDoneBtn.setAttribute("data-item-id", item);
    todo.appendChild(markAsDoneBtn);

    // Create "Edit" button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editTodo"); // Add editTodo class
    editBtn.setAttribute("data-item-id", 'edit' + item);
    todo.appendChild(editBtn);

    return todo;
}

function clearInputs() {
    titleInput.value = "";
    descriptionInput.value = "";
}

function addTodoToDom(todo) {
    const todoElement = createTodoElement(todo.title, todo.description);
    todoElement.setAttribute('data-item-id', todo.id);
    todoContainer.appendChild(todoElement);
}

function removeTodoFromDom(todoId) {
    const todoElement = getTodoItem(todoId);
    if (todoElement) {
        todoContainer.removeChild(todoElement);
    }
}

function updateTodoInDom(todo) {
    const todoElement = getTodoItem(todo.id);
    if (todoElement) {
        const titleElement = todoElement.querySelector('.todo-title');
        const descriptionElement = todoElement.querySelector('.todo-description');
        titleElement.textContent = todo.title;
        descriptionElement.textContent = todo.description;
    }
}

function updateState(newTodos) {
    console.log("Inside updateState Fn.");
    const oldTodos = Array.from(todoContainer.querySelectorAll('.todo-item'));
    console.log('OldTodos:', oldTodos);
    console.log('newTodos:', newTodos);


    newTodos.forEach(newTodo => {
        const oldTodoIndex = oldTodos.findIndex(todo => todo.dataset.itemId === newTodo.id);
        console.log('OldTodoIndex = ',oldTodoIndex)
        if (oldTodoIndex !== -1) {
            // Update existing todo
            console.log('Updating existing todo.');
            updateTodoInDom(newTodo);
            oldTodos.splice(oldTodoIndex, 1); // Remove the updated todo from oldTodos array
        } else {
            // Add new todo
            console.log('Adding new todo');
            addTodoToDom(newTodo);
        }
    });

    // Remove todos that are no longer in the new state
    oldTodos.forEach(oldTodo => {
        const oldTodoId = oldTodo.dataset.itemId;
        removeTodoFromDom(oldTodoId);
    });
}


function add2do(){
    let item = titleInput.value.trim();
    let itemDesc = descriptionInput.value.trim();
    if (!item || !itemDesc) {
        disableSubmitButton();
        titleInput.value = "Enter todo";
        descriptionInput.value = "Enter Description";
        setTimeout(() => {
            enableSubmitButton();
            titleInput.value = "";
            descriptionInput.value = "";
        }, 500);
    } else {
        const todo = createTodoElement(item, itemDesc);
        todoContainer.appendChild(todo);
        clearInputs();
    }  
}

function updateTodoAccordingToState(state){
    todoContainer.innerHTML = "";
    for(let i=0; i<state.length; i++){
        const todoElement = createTodoElement(state[i].title, state[i].description);
        todoContainer.appendChild(todoElement);

    }
}

const intervalId = window.setInterval(async () => {
    try{
        const res = await fetch("https://sum-server.100xdevs.com/todos");
        const data = await res.json();
        // console.log(data.todos);
        updateState(data.todos);
    }catch(error){
        console.error("Error fetching todos:", error);
    }
},5000);

setTimeout(() => {
    clearInterval(intervalId);
}, 20000);

document.addEventListener('DOMContentLoaded', function() {
    
    todoContainer.addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const itemId = target.getAttribute('data-item-id');
            if (target.classList.contains('markAsDone')) {
                markAsDone(itemId);
            } else if (target.classList.contains('editTodo')) {
                editTodo(itemId);
            }else if (target.classList.contains('updateTodo')) {
                updateTodo(itemId);
            } else if (target.classList.contains('removeItem')) {
                removeItem(itemId);
            }
        }
    });
    submitButton.addEventListener('click', add2do);
});

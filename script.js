const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("new-todo-item-add");
const inputTodo = document.getElementById("new-todo-item-title");
const newItemDiv = document.getElementById("new-item");
const editItemDiv = document.getElementById("edit-item");
const editConfirm = document.getElementById("edit-todo-item-confirm");
const editCancel = document.getElementById("edit-todo-item-cancel");
const editInput = document.getElementById("edit-todo-item-title");

let itemToEdit;

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => addTodoToDOM(todo.text, todo.id));
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      const text = li.querySelector("span").textContent;
      const id = li.dataset.id;
      todos.push({ text, id });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


function addTodoToDOM(todoText, id = Date.now()){
    const listItem = document.createElement('li');

    listItem.dataset.id = id;

    const textSpan = document.createElement('span');
    textSpan.textContent = todoText
    inputTodo.value = '';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
        saveTodos();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    
    editButton.addEventListener('click', () => {
        editItemDiv.hidden = false;
        newItemDiv.hidden = true;

        editInput.value = textSpan.textContent;
        itemToEdit = textSpan;
    });

    listItem.appendChild(textSpan)
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    todoList.appendChild(listItem);
};

addButton.addEventListener("click", () => {
    const todoText = inputTodo.value.trim();
    if (todoText !== "") {
      addTodoToDOM(todoText);
      saveTodos();
      inputTodo.value = "";
    }
  });

editCancel.addEventListener('click', () => {
    editInput.value = '';
    editItemDiv.hidden = true;
    newItemDiv.hidden = false;
});

editConfirm.addEventListener('click', () => {
    const newTodo = editInput.value.trim();
    if (newTodo !== '' && itemToEdit) {
        itemToEdit.textContent = newTodo;
        saveTodos();
        editInput.value = '';
        itemToEdit = null;
        editItemDiv.hidden = true;
        newItemDiv.hidden = false;
    }
});

loadTodos();
const todoList = document.getElementById("todo-list");
const addButton = document.getElementById("new-todo-item-add");
const inputTodo = document.getElementById("new-todo-item-title");
const newItemDiv = document.getElementById("new-item");
const editItemDiv = document.getElementById("edit-item");
const editConfirm = document.getElementById("edit-todo-item-confirm");
const editCancel = document.getElementById("edit-todo-item-cancel");
const editInput = document.getElementById("edit-todo-item-title");



addButton.addEventListener('click', () => {
    const item = inputTodo.value.trim()
    if (item !== ''){
        const listItem = document.createElement('li');
        const textSpan = document.createElement('span');

        textSpan.textContent = item
        inputTodo.value = '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        
        editButton.addEventListener('click', () => {
            editItemDiv.hidden = false;
            newItemDiv.hidden = true;

            text = textSpan.textContent;
            editInput.value = text;
            itemToEdit = textSpan;
        });

        listItem.appendChild(textSpan)
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        todoList.appendChild(listItem);
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
        editInput.value = '';
        itemToEdit = null;
        editItemDiv.hidden = true;
        newItemDiv.hidden = false;
    }
});
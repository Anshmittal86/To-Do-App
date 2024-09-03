const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");

// Click Events
addBtnEl.addEventListener("click", addToDo);
todoListEl.addEventListener("click", handleClick);

// Load todos when the page is loaded
window.addEventListener("DOMContentLoaded", function () {
  loadTodos();
  focusInput();
});

function focusInput() {
  todoInputEl.focus();
}

// Load todos from localStorage and display them
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  // Clear existing todos
  todoListEl.innerHTML = "";

  // Create a DocumentFragment to optimize DOM manipulation
  const fragment = document.createDocumentFragment();

  todos.forEach((todo, index) => {
    const { text, completed } = todo;
    fragment.appendChild(createTodoElement(index, text, completed));
  });

  todoListEl.appendChild(fragment);
}

// Add a new todo item
function addToDo() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoInputEl.value.trim();

  if (!todoText) {
    alert("Task must be filled.");
    return;
  }

  // Simple ID based on length
  const todoId = todos.length;
  const todoObj = {
    id: todoId,
    text: todoText,
    completed: false,
  };

  todos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
  // Clear input field
  todoInputEl.value = "";

  // Append the new todo to the list element
  todoListEl.appendChild(createTodoElement(todoId, todoText, false));
}

// Create a todo element
function createTodoElement(id, text, completed) {
  const li = document.createElement("li");
  li.className = "todo";
  li.id = id;

  const isChecked = completed ? "true" : "false";

  li.innerHTML = `
    <input type="checkbox" class="todo-checkbox" data-check="${isChecked}" />
    <span class="todo-text">${text}</span>
    <input type="text" class="edit-input" value="${text}" style="display:none;" />
     <button class="edit-todo">
      <i class="ri-pencil-line"></i>
    </button>
    <button class="delete-todo">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;

  return li;
}

// Update todo status
function updateTodoStatus(id, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: isCompleted } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Handle editing a todo item
function handleEdit(edit) {
  const todoItem = edit.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const textSpan = todoItem.querySelector(".todo-text");
  const editInput = todoItem.querySelector(".edit-input");

  var todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Check if the todo item is completed
  const todoToEdit = todos.find((todo) => todo.id === todoId);

  if (todoToEdit.completed === true) {
    alert("Todo can't be edited after its completion");
    return;
  }

  // Toggle between view and edit mode
  if (editInput.style.display === "none") {
    // Switch to edit mode
    textSpan.style.display = "none";
    editInput.style.display = "inline";
    editInput.focus();

    // Move cursor at the end of text
    const length = editInput.value.length;
    editInput.setSelectionRange(length, length);
  } else {
    // Save the changes and switch back to view mode
    const newText = editInput.value.trim();
    if (newText === "") return; // Do nothing if input is empty

    textSpan.textContent = newText;
    textSpan.style.display = "inline";
    editInput.style.display = "none";

    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, text: newText } : todo
    );
    // Save updated todos back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Handle deleting a todo item
function handleDelete(target) {
  const todoItem = target.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos = todos
    .filter((todo) => todo.id !== todoId)
    .map((todo, index) => ({ ...todo, id: index })); // Reassign IDs

  localStorage.setItem("todos", JSON.stringify(todos));

  // Clear localStorage if no one todo exist
  if (!todos.length) {
    localStorage.clear();
  }

  todoItem.remove(); // Remove from DOM
  loadTodos(); // Rendering todo List
}

// Handle checkbox change
function handleCheckboxChange(checkbox) {
  const todoItem = checkbox.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const isChecked = checkbox.checked;

  // Update `data-check` attribute based on checkbox state
  checkbox.setAttribute("data-check", isChecked ? "true" : "false");

  updateTodoStatus(todoId, isChecked);
}

// Handle click event on todo element
function handleClick(event) {
  const target = event.target;

  if (target.classList.contains("ri-delete-bin-line")) {
    handleDelete(target);
  } else if (target.classList.contains("todo-checkbox")) {
    handleCheckboxChange(target);
  } else if (target.classList.contains("ri-pencil-line")) {
    handleEdit(target);
  }
}

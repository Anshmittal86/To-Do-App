const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");

// Add new todo when the add button is clicked
addBtnEl.addEventListener("click", addToDo);

// Function to load todos from localStorage and display them
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

// Load todos when the page is loaded
window.addEventListener("DOMContentLoaded", loadTodos);

// Function to add a new todo item
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

// Function to create a todo element
function createTodoElement(id, text, completed) {
  const li = document.createElement("li");
  li.className = "todo";
  li.id = id;

  const isChecked = completed ? "true" : "false";

  li.innerHTML = `
    <input type="checkbox" name="complete" class="todo-checkbox" data-check="${isChecked}" />
    <p class="todo-text">${text}</p>
    <div class="todo-icon">
      <i class="ri-delete-bin-line"></i>
    </div>
  `;

  return li;
}

// Event listener for deleting todos or toggling completion status
todoListEl.addEventListener("click", function (e) {
  const target = e.target;

  if (target.classList.contains("ri-delete-bin-line")) {
    handleDelete(target);
  } else if (target.classList.contains("todo-checkbox")) {
    handleCheckboxChange(target);
  }
});

// Handle deleting a todo item
function handleDelete(target) {
  const todoItem = target.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos = todos
    .filter((todo) => todo.id !== todoId)
    .map((todo, index) => ({ ...todo, id: index })); // Reassign IDs

  localStorage.setItem("todos", JSON.stringify(todos));
  // Remove from DOM
  todoItem.remove();
  // Rendering todo List
  loadTodos();
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

// Update todo status
function updateTodoStatus(id, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: isCompleted } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

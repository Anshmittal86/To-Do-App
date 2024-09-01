const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");
const deleteTodoIcon = document.querySelector(".todo-icon");

// Add new todo when the add button is clicked
addBtnEl.addEventListener("click", function () {
  addToDo();
});

// Function to load todos from localStorage and display them
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((obj) => {
    const { id, text } = obj;

    // Create HTML for each todo item
    const todoHTML = `
      <li class="todo" id="${id}">
        <input type="checkbox" name="complete" id="check" />
        <p class="todo-text">${text}</p>
        <div class="todo-icon">
          <i class="ri-delete-bin-line"></i>
        </div>
      </li>
    `;

    // Append each todo to the list element
    todoListEl.innerHTML += todoHTML;
  });
}

// Load todos when the page is loaded
window.addEventListener("DOMContentLoaded", loadTodos);

// Function to add a new todo item
function addToDo() {
  // Get todos from localStorage, or initialize as empty array if none exist
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  const todoText = todoInputEl.value;
  const todoId = todos.length; // Use length as a simple ID

  // Create todo object with unique id, text, and completion status
  let todoObj = {
    id: todoId,
    text: todoText,
    completed: false,
  };

  // Ensure todo input is not empty
  if (!todoText) {
    alert("Task must be filled.");
  } else {
    // Generate HTML for the new todo item
    const todo = `
      <li class="todo" id="${todos.length}">
        <input type="checkbox" name="complete" id="check" />
        <p class="todo-text">${todoText}</p>
        <div class="todo-icon">
          <i class="ri-delete-bin-line"></i>
        </div>
      </li>
    `;

    // Clear the input field
    todoInputEl.value = "";

    // Append the new todo to the list element
    todoListEl.innerHTML += todo;

    // Add the new todo object to the todos array
    todos.push(todoObj);

    // Store the updated todos array in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

// Event listener for deleting todos when the delete icon is clicked
todoListEl.addEventListener("click", function (e) {
  // Check if the clicked element is the delete icon
  if (e.target.classList.contains("ri-delete-bin-line")) {
    const currentTodoItem = e.target.closest(".todo"); // Get the closest todo item element
    const currentTodoId = currentTodoItem.id; // Get the todo item's ID

    // Remove the todo item from the DOM
    currentTodoItem.remove();

    // Get todos from localStorage
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Filter out the todo item that matches the current ID
    todos = todos.filter((todo) => {
      return currentTodoId != todo.id;
    });

    // Update localStorage with the filtered todos array
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});


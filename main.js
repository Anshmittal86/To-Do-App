const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");
const deleteTodoIcon = document.querySelector(".todo-icon");

addBtnEl.addEventListener("click", function () {
  addToDo();
});

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todoItem, index) => {
    const todoHTML = `
      <li class="todo" id="${index}">
        <input type="checkbox" name="complete" id="check" />
        <p class="todo-text">${todoItem}</p>
        <div class="todo-icon">
          <i class="ri-delete-bin-line"></i>
        </div>
      </li>
    `;

    todoListEl.innerHTML += todoHTML;
  });
}

window.addEventListener("DOMContentLoaded", loadTodos);

function addToDo() {

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoInputEl.value;

  if (!todoText) {
    alert("Task must be fill.");
  } else {
    const todo = `
      <li class="todo" id="${todos.length - 1}">
        <input type="checkbox" name="complete" id="check" />
          <p class="todo-text">${todoText}</p>
          <div class="todo-icon">
            <i class="ri-delete-bin-line"></i>
          </div>
      </li>
      `;

    todoListEl.innerHTML += todo;
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    
  }
}

todoListEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("ri-delete-bin-line")) {
    const todoItem = e.target.closest(".todo");
    const todoId = todoItem.id;

    todoItem.remove();

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.splice(todoId, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    todoListEl.innerHTML = "";
    loadTodos();
  }
});

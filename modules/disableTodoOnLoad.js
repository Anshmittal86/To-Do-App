export function disabledTodoOnLoad() {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoCheckbox = todo.querySelector(".todo-checkbox");
    const editTodoBtn = todo.querySelector(".edit-todo");
    const isChecked = todoCheckbox.getAttribute("data-check");
    if (JSON.parse(isChecked)) {
      editTodoBtn.classList.add("disabled");
      todoCheckbox.classList.add("disabled");
    }
  });
}

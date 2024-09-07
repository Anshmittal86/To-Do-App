export function disableTodo(todoId) {
  const todoElement = document.getElementById(`${todoId}`);

  if (!todoElement) return;

  const todoCheckbox = todoElement.querySelector(".todo-checkbox");
  const editTodoBtn = todoElement.querySelector(".edit-todo");
  editTodoBtn.classList.add("disabled");
  todoCheckbox.classList.add("disabled");
}

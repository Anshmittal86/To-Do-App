export function setTodoAtLocal(updatedTodos) {
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

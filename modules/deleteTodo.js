import { loadTodos } from "./index";
// Handle deleting a todo item
export function handleDelete(target) {
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

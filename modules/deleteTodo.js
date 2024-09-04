import { loadTodos, toggleEmptyTodoMsg, getTodoFromLocal,
  setTodoAtLocal, } from "./index";
// Handle deleting a todo item
export function handleDelete(target) {
  const todoItem = target.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  let todos = getTodoFromLocal();;

  todos = todos
    .filter((todo) => todo.id !== todoId)
    .map((todo, index) => ({ ...todo, id: index })); // Reassign IDs

    setTodoAtLocal(todos);

  // Clear localStorage if no one todo exist
  if (!todos.length) {
    localStorage.clear();
  }

  todoItem.remove(); // Remove from DOM
  toggleEmptyTodoMsg();
  loadTodos(); // Rendering todo List
}

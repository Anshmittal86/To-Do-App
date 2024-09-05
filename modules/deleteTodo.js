import {
  loadTodos,
  toggleEmptyTodoMsg,
  getTodoFromLocal,
  setTodoAtLocal,
} from "./index";

// Handle deleting a todo item
export function handleDelete(target) {
  const todoItem = target.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);

  // Get todos from localStorage
  let todos = getTodoFromLocal();

  // Filter out the deleted todo, and reassign Ids
  const updatedTodos = todos
    .filter((todo) => todo.id !== todoId)
    .map((todo, index) => ({ ...todo, id: index })); // Reassign IDs

  // Save the updated todos to localStorage
  setTodoAtLocal(updatedTodos);

  // Remove the deleted todo from the DOM
  todoItem.remove();

  // Toggle empty message if there are no more todos
  toggleEmptyTodoMsg();

  // Rendering todo List with new IDs
  loadTodos();

  // Clear localStorage if no one todo exist
  if (!updatedTodos.length) {
    localStorage.clear();
  }
}

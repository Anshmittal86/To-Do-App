import {
  loadTodos,
  toggleEmptyTodoMsg,
  getTodoFromLocalStorage,
  setTodoInLocalStorage,
  updateDeadlineTime,
} from "./index";

/**
 * Handle deleting a todo item
 *
 * @param {Element} target - Element that was clicked to delete the todo
 */
export function handleDelete(target) {
  // Get the todo item element and its ID
  const todoElement = target.closest(".todo");
  const todoId = parseInt(todoElement.id, 10);

  // Get the current list of todos from localStorage
  const todos = getTodoFromLocalStorage();

  // Create a new list of todos without the one being deleted
  const updatedTodos = todos.filter((todo) => todo.id !== todoId);

  // Reassign the IDs of the remaining todos so that they are contiguous
  const updatedTodosWithReassignedIds = updatedTodos.map((todo, index) => ({
    ...todo,
    id: index,
  }));

  // Save the updated todos back to localStorage
  setTodoInLocalStorage(updatedTodosWithReassignedIds);

  // Remove the deleted todo from the DOM
  todoElement.remove();

  // Toggle the "No todos" message if there are no todos left
  toggleEmptyTodoMsg();

  // Reload the list of todos
  loadTodos();

  // Update the deadlines of the remaining todos
  updateDeadlineTime();

  // Clear localStorage if there are no todos left
  if (!updatedTodosWithReassignedIds.length) {
    localStorage.clear();
  }
}

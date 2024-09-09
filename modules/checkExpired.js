import { getTodoFromLocalStorage, handleDelete } from "./index";

/**
 * Checks all the todos in the local storage and deletes the ones that have expired.
 * Also clears the local storage if there are no more todos left.
 */
export function checkExpiredTodos() {
  const todos = getTodoFromLocalStorage();

  // Get current time
  const now = Date.now();

  // Initialize variables to keep track of the number of active timeouts and whether any updates need to be made
  let activeTimeouts = 0;
  let todosToUpdate = false;

  // Loop through all the todos
  todos.forEach((todo) => {
    // If the todo is expired and its expiration time is in the past, delete it
    if (todo.expired && todo.expirationTime <= now) {
      handleDelete(todo.id);
    }
    // If the todo is expired and its expiration time is in the future, set a timeout to delete it after the remaining time
    else if (todo.expired && todo.expirationTime > now) {
      const timeRemaining = todo.expirationTime - now;

      activeTimeouts++;
      todosToUpdate = true;

      setTimeout(() => {
        handleDelete(todo.id);
        activeTimeouts--;

        // If there are no more active timeouts, clear the local storage if there are no more todos left
        if (activeTimeouts === 0) {
          const remainingTodos = getTodoFromLocalStorage();
          if (remainingTodos.length === 0) {
            localStorage.clear();
          }
        }
      }, timeRemaining);
    }
  });

  // If no updates were needed and there are no more active timeouts, clear the local storage if there are no more todos left
  if (!todosToUpdate && activeTimeouts === 0) {
    const remainingTodos = getTodoFromLocalStorage();
    if (remainingTodos.length === 0) {
      localStorage.clear();
    }
  }
}

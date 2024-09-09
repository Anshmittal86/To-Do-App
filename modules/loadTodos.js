import {
  getTodoFromLocalStorage,
  createTodoElement,
  updateChartData,
  todoListEl,
  expiredTodoListEl,
  updateDeadlineTime,
  disableCompletedAndExpiredTodosOnLoad,
  toggleEmptyTodoMsg,
  toggleExpiredSectionVisibility,
  checkExpiredTodos,
} from "./index";

// Load todos from localStorage and display them
export function loadTodos() {
  // Get todos from localStorage
  const todos = getTodoFromLocalStorage();

  // If there are no todos, toggle empty todo message and return
  if (!todos) {
    toggleEmptyTodoMsg();
    return;
  }

  // Clear existing todos
  todoListEl.innerHTML = "";
  expiredTodoListEl.innerHTML = "";

  // Create a DocumentFragment to optimize DOM manipulation
  const fragmentMain = document.createDocumentFragment();
  const fragmentExpired = document.createDocumentFragment();

  // Loop through all todos
  todos.forEach((todo, index) => {
    // Destructure todo object to get its properties
    const { text, completed, elapsedTime, expired } = todo;

    // Create a new todo list item element
    const todoElement = createTodoElement(
      index,
      text,
      completed,
      elapsedTime,
      expired
    );

    // If the todo is expired, add it to the expired fragment
    if (expired) {
      fragmentExpired.appendChild(todoElement);
    } else {
      // Otherwise, add it to the main fragment
      fragmentMain.appendChild(todoElement);
    }
  });

  // Append the elements to their respective lists
  todoListEl.appendChild(fragmentMain);
  expiredTodoListEl.appendChild(fragmentExpired);

  // Toggle empty todo message, expired section visibility, and update data
  toggleEmptyTodoMsg();
  toggleExpiredSectionVisibility();
  updateChartData();
  updateDeadlineTime();
  disableCompletedAndExpiredTodosOnLoad();
  checkExpiredTodos();
}

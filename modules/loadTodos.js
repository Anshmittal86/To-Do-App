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
} from "./index";

// Load todos from localStorage and display them
export function loadTodos() {
  const todos = getTodoFromLocalStorage();

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

  todos.forEach((todo, index) => {
    const { text, completed, elapsedTime, expired } = todo;
    const todoElement = createTodoElement(index, text, completed, elapsedTime, expired);

    if (expired) {
      fragmentExpired.appendChild(todoElement);
    } else {
      fragmentMain.appendChild(todoElement);
    }
  });

  // Append elements to their respective lists
  todoListEl.appendChild(fragmentMain);
  expiredTodoListEl.appendChild(fragmentExpired);

  toggleEmptyTodoMsg();
  toggleExpiredSectionVisibility();
  updateChartData();
  updateDeadlineTime();
  disableCompletedAndExpiredTodosOnLoad();
}

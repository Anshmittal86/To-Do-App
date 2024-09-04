import {
  getTodoFromLocal,
  createTodoElement,
  updateChartData,
  todoListEl,
} from "./index";

// Load todos from localStorage and display them
export function loadTodos() {
  const todos = getTodoFromLocal();

  // Clear existing todos
  todoListEl.innerHTML = "";

  // Create a DocumentFragment to optimize DOM manipulation
  const fragment = document.createDocumentFragment();

  todos.forEach((todo, index) => {
    const { text, completed } = todo;
    fragment.appendChild(createTodoElement(index, text, completed));
  });

  todoListEl.appendChild(fragment);
  updateChartData();
}

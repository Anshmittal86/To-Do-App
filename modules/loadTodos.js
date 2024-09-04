import { todoListEl } from "./index";
import { updateChartData } from "./index";
import { createTodoElement } from "./index";

// Load todos from localStorage and display them
export function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

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

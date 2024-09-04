import {
  addBtnEl,
  todoInputEl,
  todoListEl,
  switchModeEl,
  toggleEmptyTodoMsg,
  addToDo,
  handleClick,
  loadTodos,
  createChart,
  updateChartData,
} from "./modules";

/***** Load some function after DOM content loaded *****/
window.addEventListener("DOMContentLoaded", function () {
  toggleEmptyTodoMsg();
  createChart(); // Initialize the chart
  loadTodos(); // Load todos and update the chart
  todoInputEl.focus(); // Focus Input Element
  initializeListeners(); // Initialize listeners
});

/***** Initialize listeners *****/
function initializeListeners() {
  addBtnEl.addEventListener("click", addToDo);
  todoListEl.addEventListener("click", handleClick);
}

/***** Dark Mode *****/
switchModeEl.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("light");
  updateChartData();
}

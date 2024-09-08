import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {
  addBtnEl,
  todoInputEl,
  todoListEl,
  expiredTodoListEl,
  switchModeEl,
  addToDo,
  handleClick,
  loadTodos,
  createChart,
  updateChartData,
} from "./modules";

/***** Load some function after DOM content loaded *****/
window.addEventListener("DOMContentLoaded", function () {
  createChart(); // Initialize the chart
  loadTodos(); // Load todos and update the chart
  todoInputEl.focus(); // Focus Input Element
  initializeListeners(); // Initialize listeners
});

/***** Initialize listeners *****/
function initializeListeners() {
  addBtnEl.addEventListener("click", addToDo);
  todoListEl.addEventListener("click", handleClick);
  expiredTodoListEl.addEventListener("click", handleClick)
}

/***** Dark Mode *****/
switchModeEl.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  document.body.classList.toggle("light");
  updateChartData();
}

/***** Initialize Flatpickr *****/
const datePicker = flatpickr("#todoDeadline", {
  enableTime: true,
  dateFormat: "Y-m-dTH:i",
  minDate: "today",
  disableMobile: "true",
});

// Attach the function to the button click event
document
  .querySelector("#calendarIcon")
  .addEventListener("click", openDatePicker);

// Function to open the date picker
function openDatePicker() {
  datePicker.open(); // Programmatically open the date picker
}


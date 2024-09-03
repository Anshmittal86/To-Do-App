import { Chart, registerables } from "chart.js";

// Register necessary components
Chart.register(...registerables);

// Get the canvas context
const ctx = document.getElementById("myDoughnutChart").getContext("2d");

let myDoughnutChart; // Global chart instance

function createChart() {
  // Initial chart data
  const initialData = {
    datasets: [
      {
        label: "To do Chart",
        data: [0, 0], // Initial data values
        backgroundColor: ["rgb(128,128,128)", "rgb(50, 205, 50)"],
        borderColor: ["rgb(65, 63, 66)", "rgb(57, 153, 24)"],
        borderWidth: 1,
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      const chartWidth = width;
      const chartHeight = height;

      // Calculate the center of the chart
      const centerX = chartWidth / 2;
      const centerY = chartHeight / 2;

      // Text settings
      const fontSize = 2.5;
      const lineHeight = 24; // Adjust line height as needed

      ctx.save();
      ctx.font = `bold min(${fontSize}vw, 18px) Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f4f4f4";

      // Retrieve data from chart options
      const todoLength = chart.options.plugins.centerTextPlugin.todoLength || 0;
      const noOfComplete =
        chart.options.plugins.centerTextPlugin.noOfComplete || 0;

      // Draw the percentage text
      ctx.fillText(
        `${noOfComplete} / ${todoLength}`,
        centerX,
        centerY - lineHeight / 2
      );

      // Draw the additional text below the percentage
      ctx.fillText("Complete", centerX, centerY + lineHeight / 2);

      ctx.restore();
    },
  };

  // Create and configure the Doughnut chart
  myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: initialData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              // Calculate the percentage for each slice
              const total = tooltipItem.dataset.data.reduce(
                (acc, val) => acc + val,
                0
              );
              const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${percentage}%`;
            },
          },
        },
        centerTextPlugin,
      },
    },
    plugins: [centerTextPlugin], // Add the plugin to the chart
  });
}

function updateChartData() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let length = todos.length;
  let complete = todos.filter((todo) => todo.completed).length;

  // Call updateChart with the new length and completed todos
  updateChart(length, complete);
}

function updateChart(todoLength, noOfComplete) {
  if (!myDoughnutChart) return; // Ensure chart is initialized

  if (todoLength === 0) {
    todoLength = 1; // Avoid division by zero
  }

  // Calculate the percentage of completed todos
  const completedPercentage = (noOfComplete / todoLength) * 100;
  const remainingPercentage = 100 - completedPercentage;

  const newData = {
    datasets: [
      {
        label: "To do Chart",
        data: [completedPercentage, remainingPercentage],
        backgroundColor: ["rgb(50, 205, 50)", "rgb(128,128,128)"],
        borderColor: ["rgb(57, 153, 24)", "rgb(65, 63, 66)"],
        borderWidth: 1,
      },
    ],
  };

  // Update chart with new data
  myDoughnutChart.data = newData;

  // Update plugin data
  myDoughnutChart.options.plugins.centerTextPlugin.noOfComplete = noOfComplete;
  myDoughnutChart.options.plugins.centerTextPlugin.todoLength = todoLength;

  myDoughnutChart.update(); // Call update to refresh the chart
}

// Event Listeners
const addBtnEl = document.querySelector("#add-todo");
const todoInputEl = document.querySelector("#todo-input");
const todoListEl = document.querySelector(".todos-list");

addBtnEl.addEventListener("click", addToDo);
todoListEl.addEventListener("click", handleClick);

window.addEventListener("DOMContentLoaded", function () {
  createChart(); // Initialize the chart
  loadTodos(); // Load todos and update the chart
  focusInput();
});

function focusInput() {
  todoInputEl.focus();
}

// Load todos from localStorage and display them
function loadTodos() {
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

// Add a new todo item
function addToDo() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoText = todoInputEl.value.trim();
  if (!todoText) {
    alert("Task must be filled.");
    return;
  }

  // Simple ID based on length
  const todoId = todos.length;
  const todoObj = {
    id: todoId,
    text: todoText,
    completed: false,
  };

  todos.push(todoObj);
  localStorage.setItem("todos", JSON.stringify(todos));
  // Clear input field
  todoInputEl.value = "";

  // Append the new todo to the list element
  todoListEl.appendChild(createTodoElement(todoId, todoText, false));
  updateChartData();
}

// Create a todo element
function createTodoElement(id, text, completed) {
  const li = document.createElement("li");
  li.className = "todo";
  li.id = id;

  const isChecked = completed ? "true" : "false";

  li.innerHTML = `
    <input type="checkbox" class="todo-checkbox" data-check="${isChecked}" />
    <span class="todo-text">${text}</span>
    <input type="text" class="edit-input" value="${text}" style="display:none;" />
     <button class="edit-todo">
      <i class="ri-pencil-line"></i>
    </button>
    <button class="delete-todo">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;

  return li;
}

// Update todo status
function updateTodoStatus(id, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: isCompleted } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Handle editing a todo item
function handleEdit(edit) {
  const todoItem = edit.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const textSpan = todoItem.querySelector(".todo-text");
  const editInput = todoItem.querySelector(".edit-input");

  var todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Check if the todo item is completed
  const todoToEdit = todos.find((todo) => todo.id === todoId);

  if (todoToEdit.completed === true) {
    alert("Todo can't be edited after its completion");
    return;
  }

  // Toggle between view and edit mode
  if (editInput.style.display === "none") {
    // Switch to edit mode
    textSpan.style.display = "none";
    editInput.style.display = "inline";
    editInput.focus();

    // Move cursor at the end of text
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  } else {
    // Save the changes and switch back to view mode
    const newText = editInput.value.trim();
    if (newText) {
      textSpan.textContent = newText;
      textSpan.style.display = "inline";
      editInput.style.display = "none";
      todos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      );
      // Save updated todos back to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}

// Handle deleting a todo item
function handleDelete(target) {
  const todoItem = target.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos = todos
    .filter((todo) => todo.id !== todoId)
    .map((todo, index) => ({ ...todo, id: index })); // Reassign IDs

  localStorage.setItem("todos", JSON.stringify(todos));

  // Clear localStorage if no one todo exist
  if (!todos.length) {
    localStorage.clear();
  }

  todoItem.remove(); // Remove from DOM
  loadTodos(); // Rendering todo List
}

// Handle checkbox change
function handleCheckboxChange(checkbox) {
  const todoItem = checkbox.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const isChecked = checkbox.checked;

  // Update `data-check` attribute based on checkbox state
  checkbox.setAttribute("data-check", isChecked ? "true" : "false");

  updateTodoStatus(todoId, isChecked);
  updateChartData();
}

// Handle click event on todo element
function handleClick(event) {
  const target = event.target;

  if (target.classList.contains("ri-delete-bin-line")) {
    handleDelete(target);
  } else if (target.classList.contains("todo-checkbox")) {
    handleCheckboxChange(target);
  } else if (target.classList.contains("ri-pencil-line")) {
    handleEdit(target);
  }
}

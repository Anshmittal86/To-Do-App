import { Chart, registerables } from "chart.js";

// Register necessary components
Chart.register(...registerables);

// Get the canvas context
const ctx = document.getElementById("myDoughnutChart").getContext("2d");

let myDoughnutChart; // Global chart instance

// Create Chart
export function createChart() {
  const initialData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        // The initial data is set to 0 for all categories
        data: [0, 0, 0],
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  const centerTextPlugin = {
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      const centerX = width / 2;
      const centerY = height / 2;
      const textColor = document.body.classList.contains("light") ? "#262626" : "#f4f4f4";

      ctx.save();
      ctx.font = "bold 16px Nunito";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;

      const { totalTodos, completedTodos } = chart.options.plugins.centerTextPlugin;

      // Render the completed todos count and the total todos count
      ctx.fillText(
        `${completedTodos} / ${totalTodos}`,
        centerX,
        centerY - 24 / 2
      );

      // Render the label "Task done"
      ctx.fillText("Task done", centerX, centerY + 24 / 2);

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
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              const total = tooltipItem.dataset.data.reduce((acc, val) => acc + val, 0);
              const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
              // Format the tooltip label to display the percentage
              return `${tooltipItem.label}: ${percentage}%`;
            },
            title: () => "",
          },
        },
        centerTextPlugin,
      },
    },
    plugins: [centerTextPlugin],
  });
}

// Update Chart

export function updateChart(
  totalTodos,
  incompleteTodos,
  completedTodos,
  expiredTodos
) {
  if (!myDoughnutChart) return; // Ensure chart is initialized

  // Calculate the percentage of each type of todo
  const incompletePercentage = (incompleteTodos / totalTodos) * 100;
  const completedPercentage = (completedTodos / totalTodos) * 100;
  const expiredPercentage = (expiredTodos / totalTodos) * 100;

  // Create a new dataset with the updated percentages
  const newData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        data: [completedPercentage, incompletePercentage, expiredPercentage],
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  // Update the chart with the new dataset
  myDoughnutChart.data = newData;

  // Update the plugin data
  myDoughnutChart.options.plugins.centerTextPlugin.totalTodos = totalTodos;
  myDoughnutChart.options.plugins.centerTextPlugin.completedTodos = completedTodos;

  // Update the chart
  myDoughnutChart.update(); // Call update to refresh the chart
}

// Update Chart Data

export function updateChartData() {
  // Get the current state of the todos from local storage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoCount = todos.length;

  // Calculate the number of incomplete todos
  const incompleteTodos = todos.filter(
    (todo) => !todo.completed && !todo.expired
  ).length;

  // Calculate the number of completed todos
  const completedTodos = todos.filter((todo) => todo.completed).length;

  // Calculate the number of expired todos
  const expiredTodos = todos.filter((todo) => todo.expired).length;

  // Call the updateChart function to update the chart with the new data
  updateChart(
    todoCount,
    incompleteTodos,
    completedTodos,
    expiredTodos
  );
}

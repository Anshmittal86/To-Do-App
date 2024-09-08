import { Chart, registerables } from "chart.js";

// Register necessary components
Chart.register(...registerables);

// Get the canvas context
const ctx = document.getElementById("myDoughnutChart").getContext("2d");

let myDoughnutChart; // Global chart instance

// Create Chart
export function createChart() {
  // Initial chart data
  const initialData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        data: [0, 0, 0], // Initial data values
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
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
      var doughtNutTextColor = "#f4f4f4";
      if (document.body.classList.contains("light")) {
        doughtNutTextColor = "#262626";
      }

      let lineHeight = 24; // Adjust line height as needed

      ctx.save();
      ctx.font = `bold 16px Nunito`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = doughtNutTextColor;

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
      ctx.fillText("Task done", centerX, centerY + lineHeight / 2);

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
          display: false, // Disable the legend
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
            title: function () {
              return ""; // Remove the title in the tooltip
            },
          },
        },
        centerTextPlugin,
      },
    },
    plugins: [centerTextPlugin], // Add the plugin to the chart
  });
}

// Update Chart
export function updateChart(
  todoLength,
  noOfIncomplete,
  noOfComplete,
  noOfExpired
) {
  if (!myDoughnutChart) return; // Ensure chart is initialized

  // Calculate the percentage of completed todos
  const incompleteTodosPercentage = (noOfIncomplete * 100) / todoLength;
  const completedTodosPercentage = (noOfComplete * 100) / todoLength;
  const expiredTodosPercentage = (noOfExpired * 100) / todoLength;

  const newData = {
    labels: ["Complete", "Incomplete", "Expired"],
    datasets: [
      {
        label: "To do Chart",
        data: [
          completedTodosPercentage,
          incompleteTodosPercentage,
          expiredTodosPercentage,
        ],
        backgroundColor: ["#28a745", "#B4B4B3", "#FFB200"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };

  // Update chart with new data
  myDoughnutChart.data = newData;

  // Update plugin data
  myDoughnutChart.options.plugins.centerTextPlugin.todoLength = todoLength;
  myDoughnutChart.options.plugins.centerTextPlugin.noOfComplete = noOfComplete;

  myDoughnutChart.update(); // Call update to refresh the chart
}

// Update Chart Data
/**
 * This function updates the chart data by fetching the current state of the
 * todos from local storage, and then calculating the number of completed and
 * incomplete todos. It then calls the updateChart function to update the chart
 * with the new data.
 */
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

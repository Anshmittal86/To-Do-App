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

// Update Chart
export function updateChart(todoLength, noOfComplete) {
  if (!myDoughnutChart) return; // Ensure chart is initialized

  // Calculate the percentage of completed todos
  const completedPercentage = (noOfComplete / todoLength) * 100;
  const remainingPercentage = 100 - completedPercentage;

  const newData = {
    datasets: [
      {
        label: "To do Chart",
        data: [completedPercentage, remainingPercentage],
        backgroundColor: ["rgb(50, 205, 50)", "rgb(128,128,128)"],
        borderColor: ["rgb(57, 153, 24)", "rgb(115, 115, 115"],
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

// Update Chart Data
export function updateChartData() {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let length = todos.length;
  let complete = todos.filter((todo) => todo.completed).length;

  // Call updateChart with the new length and completed todos
  updateChart(length, complete);
}

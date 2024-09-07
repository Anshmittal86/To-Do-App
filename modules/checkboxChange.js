import {
  updateChartData,
  updateTodoStatus,
  updateElapsedTime,
  disableTodo,
} from "./index";
import Swal from "sweetalert2";
// Handle checkbox change
export function handleCheckboxChange(checkbox) {
  const todoItem = checkbox.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const isChecked = checkbox.checked;

  if (checkbox.getAttribute("class").includes("disabled")) {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "You can't uncheck this todo!",
    });
    return;
  }

  // Update `data-check` attribute based on checkbox state
  checkbox.setAttribute("data-check", isChecked ? "true" : "false");

  updateTodoStatus(todoId, isChecked);
  updateElapsedTime();
  updateChartData();
  disableTodo(todoId);
}

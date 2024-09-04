import { updateChartData } from "./index";
import { updateTodoStatus } from "./index";

// Handle checkbox change
export function handleCheckboxChange(checkbox) {
  const todoItem = checkbox.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const isChecked = checkbox.checked;

  // Update `data-check` attribute based on checkbox state
  checkbox.setAttribute("data-check", isChecked ? "true" : "false");

  updateTodoStatus(todoId, isChecked);
  updateChartData();
}

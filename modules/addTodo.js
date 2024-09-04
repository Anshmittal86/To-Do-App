import { todoInputEl, todoListEl } from "./index";
import { updateChartData } from "./index";
import { createTodoElement } from "./index";
// Add a new todo item
export function addToDo() {
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

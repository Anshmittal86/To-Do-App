import {
  todoInputEl,
  todoListEl,
  updateChartData,
  createTodoElement,
  toggleEmptyTodoMsg,
  getTodoFromLocal,
  setTodoAtLocal,
} from "./index";

// Add a new todo item
export function addToDo() {
  let todos = getTodoFromLocal();
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

  // Set Todo at local Storage
  setTodoAtLocal(todos);

  // Clear input field
  todoInputEl.value = "";

  // Append the new todo to the list element
  todoListEl.appendChild(createTodoElement(todoId, todoText, false));

  toggleEmptyTodoMsg();
  updateChartData();
}

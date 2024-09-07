import Swal from "sweetalert2";
import {
  todoInputEl,
  todoListEl,
  todoDeadlineInputEl,
  updateChartData,
  createTodoElement,
  toggleEmptyTodoMsg,
  getTodoFromLocal,
  setTodoAtLocal,
  updateDeadlineTime,
} from "./index";

// Helper function to create a new todo object with the necessary properties
function createTodoObject(id, text, currentTime, deadlineTime) {
  return {
    id, // Unique identifier for the todo
    text, // The content or text of the todo
    completed: false, // Status of the todo (false by default)
    createdAt: currentTime, // Timestamp indicating when the todo was created
    deadline: deadlineTime, // Timestamp representing the todo deadline
    elapsedTime: "",
  };
}

// Main function to add a new todo item
export function addToDo() {
  // Fetch existing todos from localStorage
  let todos = getTodoFromLocal();

  // Get and trim the inputted todo text
  const todoText = todoInputEl.value.trim();

  // Generate a new ID for the todo based on the current number of todos
  const todoId = todos.length;

  // Get the selected deadline for the todo from the input
  const todoDeadline = todoDeadlineInputEl.value;

  // Validate that the task text is not empty
  if (!todoText) {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Task must be filled!",
    }); // Alert if the task is empty
    return;
  }

  // Validate that a deadline has been selected
  if (!todoDeadline) {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "No deadline selected!",
    }); // Alert if no deadline is selected
    return;
  }

  // Convert the deadline to a timestamp in milliseconds
  const deadlineTimestamp = new Date(todoDeadline).getTime();

  // Get the current time in milliseconds
  const currentTimestamp = new Date().getTime();

  // Create a new todo object with the gathered information
  const todoObj = createTodoObject(
    todoId,
    todoText,
    currentTimestamp,
    deadlineTimestamp
  );

  // Add the new todo to the existing list of todos
  todos.push(todoObj);

  // Save the updated list of todos back to localStorage
  setTodoAtLocal(todos);

  // Clear the input fields for task text and deadline
  todoInputEl.value = "";
  todoDeadlineInputEl.value = "";

  // Add the newly created todo to the UI (to the todo list)
  todoListEl.appendChild(createTodoElement(todoId, todoText, false));

  // Toggle the empty message if necessary, update chart data, and refresh deadlines
  toggleEmptyTodoMsg();
  updateChartData();
  updateDeadlineTime();
}

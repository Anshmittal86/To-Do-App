import {
  getTodoFromLocalStorage,
  disableTodo,
  setTodoInLocalStorage,
  updateChartData,
  toggleExpiredSectionVisibility,
} from "./index";
import { intervalToDuration } from "date-fns";

export function updateDeadlineTime() {
  let todos = getTodoFromLocalStorage();
  let timerId;

  // Cache DOM elements
  const timeElements = {};

  function getTimeLeft(deadline) {
    const now = Date.now();

    const duration = intervalToDuration({
      start: now,
      end: deadline,
    });

    if (duration.years > 0) {
      return `${duration.years}y ${duration.months ?? 0}m`;
    } else if (duration.months > 0) {
      return `${duration.months}m ${duration.days ?? 0}d`;
    } else if (duration.days > 0) {
      return `${duration.days}d ${duration.hours ?? 0}h`;
    } else if (duration.hours > 0) {
      return `${duration.hours}h ${duration.minutes ?? 0}min`;
    } else if (duration.minutes > 0) {
      return `${duration.minutes}min ${duration.seconds ?? 0}s`;
    } else if (duration.seconds > 0) {
      return `${duration.seconds}s`;
    } else {
      return "Expire";
    }
  }

  function updateTodoTimes() {
    let chartNeedsUpdate = false; // Flag to track if chart needs update

    todos = getTodoFromLocalStorage(); // Optional: Re-fetch todos to reflect updates
    if (!todos.length) {
      clearInterval(timerId);
      return;
    }

    todos.forEach((todo) => {
      if (todo.elapsedTime || todo.expired) {
        return; // Skip already processed or expired todos
      }

      let timeElement = timeElements[todo.id];
      if (!timeElement) {
        timeElement = document.querySelector(`#todo-deadline-${todo.id}`);
        timeElements[todo.id] = timeElement;
      }

      if (timeElement) {
        const newTime = getTimeLeft(todo.deadline);
        if (timeElement.textContent !== newTime) {
          timeElement.textContent = newTime;
          if (newTime === "Expire") {
            todo.expired = true;
            disableTodo(todo.id);

            // Move to expired section
            const todoElement = document.getElementById(`${todo.id}`);

            if (todoElement) {
              todoElement.remove();
              const expiredList = document.querySelector(
                ".container-expiredTodos .todos-list"
              );
              expiredList.appendChild(todoElement);
              toggleExpiredSectionVisibility();
              chartNeedsUpdate = true; // set Flag if chart needs to be updated
            }
          }
        }
      }
    });

    setTodoInLocalStorage(todos);

    // Update chart only if necessary
    if (chartNeedsUpdate) {
      updateChartData();
    }
  }

  if (todos.length) {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(updateTodoTimes, 1000);
  }
}

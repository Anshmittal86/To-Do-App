import { getTodoFromLocal, disableTodo } from "./index";
import { intervalToDuration } from "date-fns";

export function updateDeadlineTime() {
  let todos = getTodoFromLocal();
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
      return "Time's Up";
    }
  }

  function updateTodoTimes() {
    todos = getTodoFromLocal(); // Optional: Re-fetch todos to reflect updates
    if (!todos.length) {
      clearInterval(timerId);
      return;
    }

    todos.forEach((todo) => {
      if (todo.elapsedTime) {
        return;
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

          if (newTime === "Time's Up") {
            disableTodo(todo.id);
          }
        }
      }
    });
  }

  if (todos.length) {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(updateTodoTimes, 1000);
  }
}

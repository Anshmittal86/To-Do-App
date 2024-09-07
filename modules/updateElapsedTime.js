import { getTodoFromLocal, setTodoAtLocal } from "./index";
import { intervalToDuration } from "date-fns";

export function updateElapsedTime() {
  let todos = getTodoFromLocal();
  let checkedTodos = todos.filter((todo) => todo.completed);

  function getElapsedTime(todoCreatedTime) {
    const currentTime = Date.now();

    const duration = intervalToDuration({
      start: todoCreatedTime,
      end: currentTime,
    });

    if (duration.years > 0) {
      return `${duration.years}y ${duration.months}m`;
    } else if (duration.months > 0) {
      return `${duration.months}m ${duration.days}d`;
    } else if (duration.days > 0) {
      return `${duration.days}d ${duration.hours}h`;
    } else if (duration.hours > 0) {
      return `${duration.hours}h ${duration.minutes}min`;
    } else if (duration.minutes > 0) {
      return `${duration.minutes}min ${duration.seconds ?? 0}s`;
    } else if (duration.seconds > 0) {
      return `${duration.seconds ?? 0}s`;
    }
  }

  checkedTodos.forEach((checkedTodo) => {
    if (!checkedTodo.elapsedTime) {
      const id = checkedTodo.id;
      const todoEl = document.querySelector(`#todo-deadline-${id}`);
      if (todoEl) {
        const todoCompilationTime = getElapsedTime(checkedTodo.createdAt);
        todoEl.textContent = `in ${todoCompilationTime}`;

        todos = todos.map((todo) =>
          todo.id === id
            ? { ...todo, elapsedTime: `${todoCompilationTime}` }
            : todo
        );
      }

      setTodoAtLocal(todos);
    }
  });
}

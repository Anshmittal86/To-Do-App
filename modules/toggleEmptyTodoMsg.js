import { emptyTaskMsgEl, getTodoFromLocalStorage } from "./index";

export function toggleEmptyTodoMsg() {
  let todos = getTodoFromLocalStorage();
  let todosLength = todos.length;

  if (!todosLength) {
    emptyTaskMsgEl.classList.add("show");
    emptyTaskMsgEl.classList.remove("hidden");
  } else {
    emptyTaskMsgEl.classList.remove("show");
    emptyTaskMsgEl.classList.add("hidden");
  }
}

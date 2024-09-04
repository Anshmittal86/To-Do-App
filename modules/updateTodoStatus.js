import { getTodoFromLocal, setTodoAtLocal } from "./index";

// Update todo status
export function updateTodoStatus(id, isCompleted) {
  let todos = getTodoFromLocal();
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: isCompleted } : todo
  );
  setTodoAtLocal(todos);
}

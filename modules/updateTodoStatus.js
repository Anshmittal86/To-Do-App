// Update todo status
export function updateTodoStatus(id, isCompleted) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: isCompleted } : todo
  );
  localStorage.setItem("todos", JSON.stringify(todos));
}
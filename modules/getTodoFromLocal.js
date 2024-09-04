export function getTodoFromLocal() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

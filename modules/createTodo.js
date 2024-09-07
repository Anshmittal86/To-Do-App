// Create a todo element
export function createTodoElement(id, text, completed, elapsedTime) {
  const li = document.createElement("li");
  let remainTime = elapsedTime;
  li.className = "todo";
  li.id = id;

  if (elapsedTime) {
    remainTime = `in ${elapsedTime}`;
  }

  const isChecked = completed ? "true" : "false";

  li.innerHTML = `
    <input type="checkbox" class="todo-checkbox" data-check="${isChecked}" />
    <span class="todo-text">${text}</span>
    <input type="text" class="edit-input" value="${text}" style="display:none;" />
    <span id="todo-deadline-${id}" class="todo-deadline">${
    remainTime ?? ""
  }</span>
    <button class="edit-todo">
      <i class="ri-pencil-line"></i>
    </button>
    <button class="delete-todo">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;

  return li;
}

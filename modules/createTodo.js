// Create a todo element
export function createTodoElement(id, text, completed) {
  const li = document.createElement("li");
  li.className = "todo";
  li.id = id;

  const isChecked = completed ? "true" : "false";

  li.innerHTML = `
    <input type="checkbox" class="todo-checkbox" data-check="${isChecked}" />
    <span class="todo-text">${text}</span>
    <input type="text" class="edit-input" value="${text}" style="display:none;" />
     <button class="edit-todo">
      <i class="ri-pencil-line"></i>
    </button>
    <button class="delete-todo">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;

  return li;
}
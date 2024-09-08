// Create a todo element
export function createTodoElement(id, text, completed, elapsedTime, expired) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const editInput = document.createElement("input");
  const deadline = document.createElement("span");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  li.className = "todo";
  li.id = id;

  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.dataset.check = completed ? "true" : "false";

  todoText.className = "todo-text";
  todoText.textContent = text;

  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = text;
  editInput.style.display = "none";

  deadline.className = "todo-deadline";
  deadline.id = `todo-deadline-${id}`;

  let remainTime;
  if (elapsedTime !== null && elapsedTime !== undefined) {
    remainTime = `in ${elapsedTime}`;
  } else {
    remainTime = "";
  }

  deadline.textContent = expired ? "Expire" : remainTime || "";

  editBtn.className = "edit-todo";
  editBtn.innerHTML = `<i class="ri-pencil-line"></i>`;

  deleteBtn.className = "delete-todo";
  deleteBtn.innerHTML = `<i class="ri-delete-bin-line"></i>`;

  li.appendChild(checkbox);
  li.appendChild(todoText);
  li.appendChild(editInput);
  li.appendChild(deadline);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

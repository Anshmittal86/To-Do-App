// Handle editing a todo item
export function handleEdit(edit) {
  const todoItem = edit.closest(".todo");
  const todoId = parseInt(todoItem.id, 10);
  const textSpan = todoItem.querySelector(".todo-text");
  const editInput = todoItem.querySelector(".edit-input");

  var todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Check if the todo item is completed
  const todoToEdit = todos.find((todo) => todo.id === todoId);

  if (todoToEdit.completed === true) {
    alert("Todo can't be edited after its completion");
    return;
  }

  // Toggle between view and edit mode
  if (editInput.style.display === "none") {
    // Switch to edit mode
    textSpan.style.display = "none";
    editInput.style.display = "inline";
    editInput.focus();

    // Move cursor at the end of text
    editInput.setSelectionRange(editInput.value.length, editInput.value.length);
  } else {
    // Save the changes and switch back to view mode
    const newText = editInput.value.trim();
    if (newText) {
      textSpan.textContent = newText;
      textSpan.style.display = "inline";
      editInput.style.display = "none";
      todos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo
      );
      // Save updated todos back to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
}

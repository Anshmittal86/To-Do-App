// Function to check if expired section should be visible
export function toggleExpiredSectionVisibility() {
  const expiredList = document.querySelector(
    ".container-expiredTodos .todos-list"
  );

  if (expiredList.children.length > 0) {
    // Show the expired section if there are expired todos
    document
      .querySelector(".container-expiredTodos")
      .classList.remove("hidden");
  } else {
    // Hide the expired section if there are no expired todos
    document.querySelector(".container-expiredTodos").classList.add("hidden");
  }
}

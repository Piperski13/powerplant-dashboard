document.getElementById("filter-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("filter-name-input");
  const filter = input.value;
  window.location.href = `/recordsViewPage?name=${filter}`;
});

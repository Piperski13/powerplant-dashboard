const filterButton = document.getElementById("filter-button");
const filterPopover = document.getElementById("filter-popover");

filterButton.addEventListener("click", () => {
  filterPopover.hidden = !filterPopover.hidden;
});

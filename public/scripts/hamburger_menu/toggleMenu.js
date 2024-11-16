const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");

hamburgerIcon.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  sidebar.classList.toggle("hidden");
});

const userDropdown = document.querySelector(".user-dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
const logoutDiv = document.querySelector(".logout-style");

const hamburgerIcon = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const sidebar = document.querySelector(".sidebar");

hamburgerIcon.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  sidebar.classList.toggle("hidden");
});

userDropdown.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevents click from closing immediately
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
  if (dropdownContent.style.display === "block") {
    logoutDiv.classList.add("active-background");
  }
});

// Close the dropdown if clicking outside of it
document.addEventListener("click", (e) => {
  if (!userDropdown.contains(e.target)) {
    dropdownContent.style.display = "none";
    logoutDiv.classList.remove("active-background");
  }
});

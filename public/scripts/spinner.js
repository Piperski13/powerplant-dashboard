document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  if (!loader) return;

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", () => {
      loader.classList.remove("hidden");
    });
  });

  const sidebarLinks = document.querySelectorAll("#menu a");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      loader.classList.remove("hidden");
    });
  });

  window.addEventListener("pageshow", () => {
    loader.classList.add("hidden");
  });
});

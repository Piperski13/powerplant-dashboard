document
  .getElementById("create-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/records/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formObject),
      });
    } catch (error) {
      console.error(error);
    }
    window.location.href = "View/recordsView.html";
  });